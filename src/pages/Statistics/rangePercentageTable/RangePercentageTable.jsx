import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Tabs, Tab, Box
} from '@mui/material';
import { median } from 'simple-statistics';
const fetchTeamStats = async (seasonId) => {
  const response = await axios.get(`http://localhost:1234/match/stats?country=Argentina&season=${seasonId}&statistics=goals,offsides,yellowCards,corners,shots,shotsOnTarget&matchesCount=5&homeOnly=true&awayOnly=true&lowerLimit=1&upperLimit=10&lessThan=false`);
  return response.data;
};

const renderTable = (stats, statisticKey, matchesType) => {
    let mediaFavorHeader = '';
    let mediaContraHeader = '';
    let mediaTotalHeader = '';
    let totalFavorHeader = '';
    let totalContraHeader = '';
  
    switch (matchesType) {
      case 'scored':
        mediaFavorHeader = `Media ${statisticKey} cometidos`;
        totalFavorHeader = `Total ${statisticKey} cometidos`;
        break;
      case 'received':
        mediaContraHeader = `Media ${statisticKey} recibidos`;
        totalContraHeader = `Total ${statisticKey} recibidos`;
        break;
      case 'total':
        mediaTotalHeader = `Media ${statisticKey} cometidos + recibidos`;
        totalFavorHeader = `Total ${statisticKey} a favor`;
        totalContraHeader = `Total ${statisticKey} en contra`;
        break;
      default:
        break;
    }
  
    const exampleTeamStats = stats[0]?.stats[statisticKey][matchesType];
    const overRangesKeys = exampleTeamStats ? Object.keys(exampleTeamStats.overRanges) : [];
    const underRangesKeys = exampleTeamStats ? Object.keys(exampleTeamStats.underRanges) : [];
  
    return (
      <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Liga</TableCell>
              <TableCell>Equipo</TableCell>
              <TableCell>PJ</TableCell>
              <TableCell>Total</TableCell> {/* Nueva columna para Totales */}
              {mediaFavorHeader && <TableCell>{mediaFavorHeader}</TableCell>}
              {mediaContraHeader && <TableCell>{mediaContraHeader}</TableCell>}
              {mediaTotalHeader && <TableCell>{mediaTotalHeader}</TableCell>}
              <TableCell>Mediana</TableCell> {/* Nueva columna para Mediana */}
              {overRangesKeys.map(rangeKey => (
                <TableCell key={`over-${rangeKey}`}>O{rangeKey.replace('_', '.')}FT (%)</TableCell>
              ))}
              {underRangesKeys.map(rangeKey => (
                <TableCell key={`under-${rangeKey}`}>U{rangeKey.replace('_', '.')}HFT (%)</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map(({ team, stats }) => {
              const matchesTotalFinished = stats[statisticKey][matchesType]?.values?.length || 0;
              const totalScored = stats[statisticKey][matchesType]?.total || 0;
              const totalReceived = stats[statisticKey][matchesType]?.total || 0;
  
              // Calcular la mediana usando simple-statistics
              const values = stats[statisticKey][matchesType]?.values || [];
             const total =  stats[statisticKey][matchesType]?.total
              const medianValue = values.length > 0 ? median(values) : 0;
  
              return (
                <TableRow key={team._id}>
                  <TableCell>{team.country}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{matchesTotalFinished}</TableCell>
                  <TableCell>{total}</TableCell> {/* Mostrar el total de valores */}
                  {mediaFavorHeader && <TableCell>{matchesTotalFinished ? (totalScored / matchesTotalFinished).toFixed(2) : '0.00'}</TableCell>}
                  {mediaContraHeader && <TableCell>{matchesTotalFinished ? (totalReceived / matchesTotalFinished).toFixed(2) : '0.00'}</TableCell>}
                  {mediaTotalHeader && <TableCell>{matchesTotalFinished ? ((totalScored + totalReceived) / matchesTotalFinished).toFixed(2) : '0.00'}</TableCell>}

                  <TableCell>{medianValue.toFixed(2)}</TableCell> {/* Mostrar la mediana */}

                  {overRangesKeys.map(rangeKey => (
                    <TableCell key={`over-${team._id}-${rangeKey}`}>
                      {calculatePercentage(stats[statisticKey][matchesType]?.overRanges?.[rangeKey], matchesTotalFinished)}%
                    </TableCell>
                  ))}
                  {underRangesKeys.map(rangeKey => (
                    <TableCell key={`under-${team._id}-${rangeKey}`}>
                      {calculatePercentage(stats[statisticKey][matchesType]?.underRanges?.[rangeKey], matchesTotalFinished)}%
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  // Función auxiliar para calcular porcentajes
  const calculatePercentage = (count, total) => {
    if (count === undefined || total === undefined || total === 0) {
      return '0.00';
    }
    return ((count / total) * 100).toFixed(2);
  };
  
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const RangePercentageTable = () => {
  const { seasonId } = useParams();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await fetchTeamStats(seasonId);
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchStats();
  }, [seasonId]);

//   if (loading) return <LoadingSpinner />;
  if (error) return <Typography>Error: {error.message}</Typography>;
  if (stats.length === 0) return <Typography>No data available</Typography>;

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const statisticKeys = ['goals', 'offsides', 'yellowCards', 'corners', 'shots', 'shotsOnTarget'];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Estadísticas de la Temporada
      </Typography>
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
          {renderTable(stats, key, 'scored')}
          <Typography variant="h6" gutterBottom>
            {key.charAt(0).toUpperCase() + key.slice(1)} - Recibido
          </Typography>
          {renderTable(stats, key, 'received')}
          <Typography variant="h6" gutterBottom>
            {key.charAt(0).toUpperCase() + key.slice(1)} - Totales
          </Typography>
          {renderTable(stats, key, 'total')}
        </TabPanel>
      ))}
    </div>
  );
};
