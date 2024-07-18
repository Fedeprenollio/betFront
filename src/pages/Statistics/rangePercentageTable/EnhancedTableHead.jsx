/* eslint-disable react/prop-types */
import React from 'react';
import { Box, TableCell, TableHead, TableRow, TableSortLabel, TextField } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

export const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort, matchesType, overRangesKeys, underRangesKeys, rows, onFilterChange } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const filteredOverRangesKeys = overRangesKeys.filter(key => {
    return rows.some(row => row[`over-${key}`] !== null);
  });

  const filteredUnderRangesKeys = underRangesKeys.filter(key => {
    return rows.some(row => row[`under-${key}`] !== null);
  });

  const mediaFavorHeader = matchesType === 'scored' ? `Media ${matchesType} cometidos` : null;
  const mediaContraHeader = matchesType === 'received' ? `Media ${matchesType} recibidos` : null;
  const mediaTotalHeader = matchesType === 'total' ? `Media ${matchesType} cometidos + recibidos` : null;

  const handleRangeFilterChange = (key, type, value, range) => {
    console.log("HOLITASSSS",value)
    const filterKey = `${type}-${key}-${range}`;
    if (onFilterChange) {
      onFilterChange({ [filterKey]: value });
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell >
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
        <TableCell style={{ zIndex: 2,}}>
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

        {filteredOverRangesKeys.map((rangeKey) => (
          <TableCell key={`over-${rangeKey}`}>
            <TableSortLabel
              active={orderBy === `over-${rangeKey}`}
              direction={orderBy === `over-${rangeKey}` ? order : 'asc'}
              onClick={createSortHandler(`over-${rangeKey}`)}
            >
              O{rangeKey.replace('_', '.')} (%)
              {orderBy === `over-${rangeKey}` ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
            <Box display="flex" flexDirection="column">
              <TextField
                label="Desde"
                variant="outlined"
                size="small"
                onChange={(e) => handleRangeFilterChange(rangeKey, 'over', e.target.value, 'from')}
              />
              <TextField
                label="Hasta"
                variant="outlined"
                size="small"
                onChange={(e) => handleRangeFilterChange(rangeKey, 'over', e.target.value, 'to')}
              />
            </Box>
          </TableCell>
        ))}
        {filteredUnderRangesKeys.map((rangeKey) => (
          <TableCell key={`under-${rangeKey}`}>
            <TableSortLabel
              active={orderBy === `under-${rangeKey}`}
              direction={orderBy === `under-${rangeKey}` ? order : 'asc'}
              onClick={createSortHandler(`under-${rangeKey}`)}
            >
              U{rangeKey.replace('_', '.')} (%)
              {orderBy === `under-${rangeKey}` ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
            <Box display="flex" flexDirection="column">
              <TextField
                label="Desde"
                variant="outlined"
                size="small"
                onChange={(e) => handleRangeFilterChange(rangeKey, 'under', e.target.value, 'from')}
              />
              <TextField
                label="Hasta"
                variant="outlined"
                size="small"
                onChange={(e) => handleRangeFilterChange(rangeKey, 'under', e.target.value, 'to')}
              />
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
