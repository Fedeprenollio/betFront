/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Tabs, Tab, Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TableSortLabel
} from '@mui/material';
import { median } from 'simple-statistics';
import { BACKEND_URL_BASE } from '../../../stores/url_base';
import { visuallyHidden } from '@mui/utils';

const fetchTeamStats = async (seasonId, homeOnly, awayOnly) => {
  const response = await axios.get(`${BACKEND_URL_BASE}/match/stats?season=${seasonId}&statistics=goals,offsides,yellowCards,corners,shots,shotsOnTarget&matchesCount=5&homeOnly=${homeOnly}&awayOnly=${awayOnly}`);
  return response.data;
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) => (order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy)
);

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort, matchesType, overRangesKeys, underRangesKeys,rows  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const filteredOverRangesKeys = overRangesKeys.filter(key => {
    return rows.some(row => row[`over-${key}`] !== null);
  });

  const filteredUnderRangesKeys = underRangesKeys.filter(key => {
    return rows.some(row => row[`under-${key}`] !== null);
  });

  console.log("underRangesKeys",)
  const mediaFavorHeader = matchesType === 'scored' ? `Media ${matchesType} cometidos` : null;
  const mediaContraHeader = matchesType === 'received' ? `Media ${matchesType} recibidos` : null;
  const mediaTotalHeader = matchesType === 'total' ? `Media ${matchesType} cometidos + recibidos` : null;

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'team.country'}
            direction={orderBy === 'team.country' ? order : 'asc'}
            onClick={createSortHandler('team.country')}
          >
            Liga
            {orderBy === 'team.country' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'team.name'}
            direction={orderBy === 'team.name' ? order : 'asc'}
            onClick={createSortHandler('team.name')}
          >
            Equipo
            {orderBy === 'team.name' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'matchesTotalFinished'}
            direction={orderBy === 'matchesTotalFinished' ? order : 'asc'}
            onClick={createSortHandler('matchesTotalFinished')}
          >
            PJ
            {orderBy === 'matchesTotalFinished' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'total'}
            direction={orderBy === 'total' ? order : 'asc'}
            onClick={createSortHandler('total')}
          >
            Total
            {orderBy === 'total' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        {mediaFavorHeader && (
          <TableCell>
            <TableSortLabel
              active={orderBy === 'mediaFavor'}
              direction={orderBy === 'mediaFavor' ? order : 'asc'}
              onClick={createSortHandler('mediaFavor')}
            >
              {mediaFavorHeader}
              {orderBy === 'mediaFavor' ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        )}
        {mediaContraHeader && (
          <TableCell>
            <TableSortLabel
              active={orderBy === 'mediaContra'}
              direction={orderBy === 'mediaContra' ? order : 'asc'}
              onClick={createSortHandler('mediaContra')}
            >
              {mediaContraHeader}
              {orderBy === 'mediaContra' ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        )}
        {mediaTotalHeader && (
          <TableCell>
            <TableSortLabel
              active={orderBy === 'mediaTotal'}
              direction={orderBy === 'mediaTotal' ? order : 'asc'}
              onClick={createSortHandler('mediaTotal')}
            >
              {mediaTotalHeader}
              {orderBy === 'mediaTotal' ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        )}
        <TableCell>
          <TableSortLabel
            active={orderBy === 'medianValue'}
            direction={orderBy === 'medianValue' ? order : 'asc'}
            onClick={createSortHandler('medianValue')}
          >
            Mediana
            {orderBy === 'medianValue' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      
        {/* Renderizar solo los encabezados que no tienen valores null */}
        {filteredOverRangesKeys.map((rangeKey) => (
          <TableCell key={`over-${rangeKey}`}>
            <TableSortLabel
              active={orderBy === `over-${rangeKey}`}
              direction={orderBy === `over-${rangeKey}` ? order : 'asc'}
              onClick={createSortHandler(`over-${rangeKey}`)}
            >
              O{rangeKey.replace('_', '.')}FT (%)
              {orderBy === `over-${rangeKey}` ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {filteredUnderRangesKeys.map((rangeKey) => (
          <TableCell key={`under-${rangeKey}`}>
            <TableSortLabel
              active={orderBy === `under-${rangeKey}`}
              direction={orderBy === `under-${rangeKey}` ? order : 'asc'}
              onClick={createSortHandler(`under-${rangeKey}`)}
            >
              U{rangeKey.replace('_', '.')}HFT (%)
              {orderBy === `under-${rangeKey}` ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
     
      </TableRow>
    </TableHead>
  );
};

const renderTable = (stats, statisticKey, matchesType, order, orderBy, onRequestSort) => {
  const exampleTeamStats = stats[0]?.stats[statisticKey][matchesType];
  console.log("exampleTeamStats", exampleTeamStats);
  const overRangesKeys = exampleTeamStats ? Object.keys(exampleTeamStats.overRanges) : [];
  const underRangesKeys = exampleTeamStats ? Object.keys(exampleTeamStats.underRanges) : [];
  console.log("underRangesKeys", underRangesKeys);

  const rows = stats.map(({ team, stats }) => {
    const matchesTotalFinished = stats[statisticKey][matchesType]?.values?.length || 0;
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
  const filteredUnderRangesKeys = underRangesKeys.filter(key => {
    return rows.some(row => row[`under-${key}`] !== null);
  });

  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
          matchesType={matchesType}
          overRangesKeys={overRangesKeys}
          underRangesKeys={underRangesKeys}
          rows={rows}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.team.country}</TableCell>
              <TableCell>{row.team.name}</TableCell>
              <TableCell>{row.matchesTotalFinished}</TableCell>
              <TableCell>{matchesType === 'scored' ? row.totalScored : row.totalReceived}</TableCell>
              {matchesType === 'scored' && <TableCell>{row.matchesTotalFinished !== 0 ? (row.totalScored / row.matchesTotalFinished) : 0}</TableCell>}
              {matchesType === 'received' && <TableCell>{row.matchesTotalFinished !== 0 ? (row.totalReceived / row.matchesTotalFinished) : 0}</TableCell>}
              {matchesType === 'total' && <TableCell>{row.matchesTotalFinished !== 0 ? ((row.totalScored + row.totalReceived) / row.matchesTotalFinished) : 0}</TableCell>}
              <TableCell>{row.medianValue}</TableCell>
              {overRangesKeys.map((rangeKey) => (
                <TableCell key={`over-${rangeKey}-${index}`}>{row[`over-${rangeKey}`]}</TableCell>
              ))}
              {filteredUnderRangesKeys.map((rangeKey) => (
                <TableCell key={`under-${rangeKey}-${index}`}>
                  {row[`under-${rangeKey}`]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box p={3}>{children}</Box>}
  </div>
);

export const RangePercentageTable = () => {
  const { seasonId } = useParams();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [homeOnly, setHomeOnly] = useState(true);
  const [awayOnly, setAwayOnly] = useState(true);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('team.country');

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchTeamStats(seasonId, homeOnly, awayOnly);
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadStats();
  }, [seasonId, homeOnly, awayOnly]);
  console.log("stats",stats)

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  if (stats.length === 0) return <Typography>No data available</Typography>;
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleHomeOnlyChange = (event) => {
    setHomeOnly(event.target.checked);
  };

  const handleAwayOnlyChange = (event) => {
    setAwayOnly(event.target.checked);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const statisticKeys = ['goals', 'offsides', 'yellowCards', 'corners', 'shots', 'shotsOnTarget'];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Estadísticas de la Temporada
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={homeOnly}
              onChange={handleHomeOnlyChange}
              name="homeOnly"
              color="primary"
            />
          }
          label="Home Only"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={awayOnly}
              onChange={handleAwayOnlyChange}
              name="awayOnly"
              color="primary"
            />
          }
          label="Away Only"
        />
      </FormGroup>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="stat-tabs">
        {statisticKeys.map((key, index) => (
          <Tab label={key.charAt(0).toUpperCase() + key.slice(1)} key={key} />
        ))}
      </Tabs>
      {statisticKeys.map((key, index) => (
        <TabPanel value={tabIndex} index={index} key={key}>
          <Typography variant="h6" gutterBottom>
            {key.charAt(0).toUpperCase() + key.slice(1)} - Marcado
          </Typography>
          {renderTable(stats, key, 'scored', order, orderBy, handleRequestSort)}
          <Typography variant="h6" gutterBottom>
            {key.charAt(0).toUpperCase() + key.slice(1)} - Recibido
          </Typography>
          {renderTable(stats, key, 'received', order, orderBy, handleRequestSort)}
          <Typography variant="h6" gutterBottom>
            {key.charAt(0).toUpperCase() + key.slice(1)} - Totales
          </Typography>
          {renderTable(stats, key, 'total', order, orderBy, handleRequestSort)}
        </TabPanel>
      ))}
    </div>
  );
};

