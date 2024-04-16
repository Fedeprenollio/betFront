/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/system";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import useMatchesStore from "../stores/matchesStore";

export const FilterDate = () => {

  const [selectedDate, setSelectedDateState] = useState(() => {
    // Recuperar la fecha seleccionada del almacenamiento local al cargar la página
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? dayjs(storedDate) : dayjs(); // Si no hay ninguna fecha almacenada, usar la fecha actual
  });

  const { setMatches } = useMatchesStore((state) => state);

  useEffect(() => {
    // Almacenar la fecha seleccionada en el almacenamiento local cada vez que cambie
    localStorage.setItem("selectedDate", selectedDate.toISOString());
    // Ejecutar setMatches después de que selectedDate haya sido actualizado
    setMatches({ date: selectedDate });
  }, [selectedDate, setMatches]);

  const handleDateChange = (date) => {
    setSelectedDateState(date);
    // setSelectedDate(dayjs(date).startOf("day")); // Establecer la hora en 00:00
  };

  const handlePreviousDay = () => {
    setSelectedDateState((prevDate) => prevDate.subtract(1, "day"));
  };

  const handleNextDay = () => {
    setSelectedDateState((prevDate) => prevDate.add(1, "day"));
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={handlePreviousDay}>
        <NavigateBefore />
      </IconButton>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="ddd DD MM"
          label="Seleccionar fecha"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      <IconButton onClick={handleNextDay}>
        <NavigateNext />
      </IconButton>
    </Box>
  );
};
