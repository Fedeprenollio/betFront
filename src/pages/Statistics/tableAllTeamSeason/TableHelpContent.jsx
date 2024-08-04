import { Box, Typography } from "@mui/material";

    export const tableHelpContent = (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Explicación de la Tabla de Estadísticas:
          </Typography>
          <Typography variant="body1" component="ul" gutterBottom>
            <li><strong>Total:</strong> La suma total de una estadística particular a lo largo de todos los partidos evaluados.</li>
            <li><strong>Promedio:</strong> El valor medio de la estadística, calculado dividiendo el total por el número de partidos evaluados.</li>
            <li><strong>Mediana:</strong> El valor medio de la estadística cuando los valores están ordenados. La mediana separa la mitad superior de la mitad inferior de los valores. La mediana no se ve afectada por valores extremos que muchas veces no acompañan al patron del equipo</li>
            <li><strong>Desviación Estándar:</strong> Una medida de la cantidad de variación o dispersión de la estadística. Una desviación estándar alta indica que los valores están más dispersos del promedio.</li>
            {/* <li><strong>Diferencia entre Mediana y Promedio:</strong> La diferencia entre el promedio y la mediana puede indicar si la distribución de los valores está sesgada. Una gran diferencia sugiere que la distribución no es simétrica.</li> */}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Filtros de Local, Visitante o Ambas:
          </Typography>
          <Typography variant="body1" gutterBottom>
            Puede aplicar filtros para ver estadísticas separadas de los partidos jugados en casa (local), fuera de casa (visitante) o ambos. Esto le permite analizar y comparar el rendimiento del equipo en diferentes condiciones de juego.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Utilidad en Apuestas Deportivas:
          </Typography>
          <Typography variant="body1" gutterBottom>
            Estas estadísticas son útiles, ya que le permiten identificar patrones y tendencias en el rendimiento de los equipos. Por ejemplo, la desviación estándar puede ayudar a evaluar la consistencia del equipo, mientras que la diferencia entre la mediana y el promedio puede ofrecer información sobre la distribución de los datos y posibles sesgos.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Además, puede usar los filtros para ajustar su análisis, considerando solo los partidos jugados en casa, fuera de casa o ambos, lo que puede proporcionar una visión más detallada y específica del rendimiento del equipo en diferentes escenarios.
          </Typography>
        </Box>
      );
