/* eslint-disable react/prop-types */

import { Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import { BACKEND_URL_BASE } from "../../stores/url_base";
import { useBoundStore } from "../../stores";

const URL_API = `${BACKEND_URL_BASE}/fecha`;

export const SelectedCurrentFecha = ({
    idSeason,
  fechaId,
  isCurrent,
  setCurrentFechaId,
}) => {
  const {  getSeasonById, seasonById } = useBoundStore((state) => state)
  const handleFechaSelection = async () => {
    try {
        console.log("SOY LA SEASON ID", idSeason)
      // Marcar la fecha como actual si el checkbox está marcado
      await axios.put(`${URL_API}/${fechaId}/isCurrent`);
      getSeasonById(idSeason)
      setCurrentFechaId(seasonById.currentFecha._id)
    } catch (error) {
      console.error("Error al marcar la fecha como actual:", error);
    }
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={isCurrent} onChange={handleFechaSelection} />}
      label="Es fecha actual"
    />
  );
};
