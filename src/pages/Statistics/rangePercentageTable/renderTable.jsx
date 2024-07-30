import { Paper, Table, TableBody, TableCell, TableContainer, TablePagination } from "@mui/material";
import { median } from "simple-statistics";
import { EnhancedTableHead } from "./EnhancedTableHead";
import { StyledTableRow } from "./RangePercentageTable";
import LoadingSpinner from "../../../componts/loading/LoadingSpinner";
import ExportExcelButton from "../../../componts/exportToExcel/ExportExcelButton";
import exportToExcel from "./exportToExel";
import { getComparator, stableSort } from "./untils";


export const renderTable = (
    stats,
    statisticKey,
    matchesType,
    order,
    orderBy,
    onRequestSort,
    loading,
    filters,
    handleFilterChange,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    nameFilters
  ) => {
    if (!stats) {
      return  <h1>Cargando</h1>; // O manejar de otra manera según tu lógica de aplicación
    }

    const exampleTeamStats = stats
      ? stats[0]?.stats[statisticKey][matchesType]
      : null;
    const overRangesKeys = exampleTeamStats
      ? Object.keys(exampleTeamStats.overRanges)
      : [];
    const underRangesKeys = exampleTeamStats
      ? Object.keys(exampleTeamStats.underRanges)
      : [];
  
    const rows = stats?.map(({ team, stats }) => {
      const matchesTotalFinished =
        stats[statisticKey][matchesType]?.values?.length || 0;
      const totalScored = stats[statisticKey][matchesType]?.total || 0;
      const totalReceived = stats[statisticKey][matchesType]?.total || 0;
      const values = stats[statisticKey][matchesType]?.values || [];
      const medianValue = values.length > 0 ? median(values) : 0;
  
      const percentages = overRangesKeys.reduce((acc, key) => {
        acc[`over-${key}`] = stats[statisticKey][matchesType].overRanges[key];
        return acc;
      }, {});
  
      const underPercentages = underRangesKeys.reduce((acc, key) => {
        acc[`under-${key}`] = stats[statisticKey][matchesType].underRanges[key];
        return acc;
      }, {});
  
      return {
        team,
        matchesTotalFinished,
        totalScored,
        totalReceived,
        medianValue,
        ...percentages,
        ...underPercentages,
      };
    });
  
    // Filtrar las claves de underRangesKeys que tienen valores no null en las filas de datos
    const filteredUnderRangesKeys = underRangesKeys.filter((key) => {
      return rows.some((row) => row[`under-${key}`] !== null);
    });
  
    // Función para filtrar las filas basado en los filtros aplicados
    const filterRows = (rows, filters, nameFilters) => {
      return rows?.filter((row) => {
        // Apply name filters
        if (nameFilters.length > 0 && !nameFilters.includes(row.team.name)) {
          return false;
        }
  
        for (let filterKey in filters) {
          // eslint-disable-next-line no-prototype-builtins
          if (filters.hasOwnProperty(filterKey)) {
            const [type, range, limit] = filterKey.split("-");
            const filterValue = parseFloat(filters[filterKey]);
  
            if (isNaN(filterValue)) {
              continue;
            }
  
            const rowKey = `${type}-${range}`;
            const rowValue = row[rowKey]?.percentage;
  
            if (rowValue === undefined || rowValue === null || isNaN(rowValue)) {
              return false;
            }
  
            if (limit === "from" && type === "over" && rowValue < filterValue) {
              return false;
            }
  
            if (limit === "to" && type === "over" && rowValue > filterValue) {
              return false;
            }
  
            if (limit === "from" && type === "under" && rowValue < filterValue) {
              return false;
            }
  
            if (limit === "to" && type === "under" && rowValue > filterValue) {
              return false;
            }
          }
        }
        return true;
      });
    };
  
    // Aplicar filtrado a las filas basado en los filtros actuales
    let filteredRows = filterRows(rows, filters, nameFilters);
  
    // Ordenar las filas según el orden y el criterio de orden
    filteredRows = stableSort(filteredRows, getComparator(order, orderBy));
  
    // Aplicar paginación a las filas filtradas y ordenadas
    const paginatedRows = filteredRows?.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    const handleExport = () => {
      const filteredRowsForExport = filterRows(rows, filters, nameFilters);
      console.log("filteredRowsForExport",filteredRowsForExport)
      exportToExcel(filteredRowsForExport, statisticKey,matchesType);
    };
    return (
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 840 }}
        style={{ overflowX: "auto" }}
      >
        <Table stickyHeader size="small">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            matchesType={matchesType}
            overRangesKeys={overRangesKeys}
            underRangesKeys={underRangesKeys}
            rows={rows}
            onFilterChange={handleFilterChange}
          />
  
          {!loading ? (
            <TableBody>
              {paginatedRows?.map((row, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{row?.team?.league}</TableCell>
                  <TableCell
                    style={{
                      width: "100px",
                      position: "sticky",
                      top: 0,
                      left: 0,
                      backgroundColor: "#fff",
                      zIndex: 1,
                    }}
                  >
                    {row?.team?.name}
                  </TableCell>
                  <TableCell>{row?.matchesTotalFinished}</TableCell>
                  <TableCell>
                    {matchesType === "scored"
                      ? row.totalScored
                      : row.totalReceived}
                  </TableCell>
                  {matchesType === "scored" && (
                    <TableCell>
                      {row.matchesTotalFinished !== 0
                        ? (row.totalScored / row.matchesTotalFinished).toFixed(1)
                        : 0}
                    </TableCell>
                  )}
                  {matchesType === "received" && (
                    <TableCell>
                      {row.matchesTotalFinished !== 0
                        ? (row.totalReceived / row.matchesTotalFinished).toFixed(
                            2
                          )
                        : 0}
                    </TableCell>
                  )}
                  {matchesType === "total" && (
                    <TableCell>
                      {row.matchesTotalFinished !== 0
                        ? (
                            (row.totalScored + row.totalReceived) /
                            row.matchesTotalFinished
                          ).toFixed(2)
                        : 0}
                    </TableCell>
                  )}
                  <TableCell>{row.medianValue}</TableCell>
                  {overRangesKeys.map((rangeKey) => (
                    <TableCell key={`over-${rangeKey}-${index}`}>
                      {row[`over-${rangeKey}`]?.percentage}
                    </TableCell>
                  ))}
                  {filteredUnderRangesKeys.map((rangeKey) => (
                    <TableCell key={`under-${rangeKey}-${index}`}>
                      {row[`under-${rangeKey}`]?.percentage}
                    </TableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <LoadingSpinner />
          )}
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={filteredRows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
          <ExportExcelButton onClick={handleExport} />
        {/* <ExportExcelButton onClick={() => exportToExcel(stats, statisticKey)} /> */}
      </TableContainer>
    );
  };