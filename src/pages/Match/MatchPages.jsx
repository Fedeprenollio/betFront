import MatchList from '../../componts/MatchList';
import { FilterDate } from '../../componts/FilterDate';
import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const MatchesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtener la fecha de la URL
  const queryParams = new URLSearchParams(location.search);
  const dateFromUrl = queryParams.get('date');
  
  // Almacenar la fecha seleccionada en el estado
  const [selectedDate, setSelectedDateState] = useState(() => {
    // Si hay una fecha en la URL, usarla; de lo contrario, usar la fecha actual
    return dateFromUrl ? dayjs(dateFromUrl) : dayjs().startOf('day');
  });

  useEffect(() => {
    // Actualizar la URL cada vez que cambie la fecha
    const dateString = selectedDate.format('YYYY-MM-DD'); // Formato de fecha
    navigate(`?date=${dateString}`); // Actualiza la URL con la fecha seleccionada
  }, [selectedDate, navigate]);
  return (
    <Container sx={{paddingX:"0"}}>
      <h1>Página de Partidos</h1>
      <FilterDate selectedDate={selectedDate} setSelectedDateState={setSelectedDateState} />
      <MatchList   date={selectedDate} />
    </Container>
  );
};

export default MatchesPage;
