import { Box, Typography } from "@mui/material";

export const tableHelpContent = (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        En estas tablas, se muestran los porcentajes de partidos por encima o
        debajo del valor indicado en cada columna:
      </Typography>
      <Typography variant="body1" component="ul" gutterBottom>
        <li>
          <strong>O8.5/9.5/10.5:</strong> Porcentaje de partidos por encima de
          la línea (8.5, 9.5, 10.5).
        </li>
        <Typography variant="body2" gutterBottom>
          Un valor del 80% en la columna de O1.5 significa que en el 80% de los
          partidos evaluados, el equipo superó la marca de 1.5 goles, corners,
          tiros al arco, etc.
        </Typography>
        <li>
          <strong>U8.5/9.5/10.5:</strong> Porcentaje de partidos por debajo de
          la línea (8.5, 9.5, 10.5).
        </li>
        <Typography variant="body2" gutterBottom>
          Un valor del 60% en la columna de U3.5 significa que en el 60% de los
          partidos evaluados, el equipo estuvo por debajo de la marca de 3.5
          goles, corners, tiros al arco, etc.
        </Typography>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Utilidad en Apuestas Deportivas:
      </Typography>
      <Typography variant="body1" gutterBottom>
        Estas estadísticas son útiles , ya que permiten identificar patrones y
        tendencias en el rendimiento de los equipos. Por ejemplo, si un equipo
        tiene un alto porcentaje en O8.5, significa que es más probable que los
        partidos de ese equipo tengan muchos corners, lo cual puede ser
        información valiosa al realizar apuestas.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Puedes combinar estas estadísticas con filtros para considerar solo
        partidos de local, visitante o ambos. Además, limitar el número de
        partidos para ver la tendencia reciente o, si estamos al inicio de la
        temporada, incluir también la temporada anterior.
      </Typography>
    </Box>
  );
