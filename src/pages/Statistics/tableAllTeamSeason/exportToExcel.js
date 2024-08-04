import * as XLSX from "xlsx"; // Importa xlsx

export const exportToExcel = ({filteredTeams}) => {
    // Preparar datos para exportar
    const dataToExport = filteredTeams.map(team => ({
      // teamId: team.teamId,
      teamName: team.teamName,
      goals_total: team.statistics.goals.total,
      goals_promedio: team.statistics.goals.promedio,
      goals_mediana: team.statistics.goals.mediana,
      goals_desviacion: team.statistics.goals.desviacion,
      offsides_total: team.statistics.offsides.total,
      offsides_promedio: team.statistics.offsides.promedio,
      offsides_mediana: team.statistics.offsides.mediana,
      offsides_desviacion: team.statistics.offsides.desviacion,
      yellowCards_total: team.statistics.yellowCards.total,
      yellowCards_promedio: team.statistics.yellowCards.promedio,
      yellowCards_mediana: team.statistics.yellowCards.mediana,
      yellowCards_desviacion: team.statistics.yellowCards.desviacion,
      corners_total: team.statistics.corners.total,
      corners_promedio: team.statistics.corners.promedio,
      corners_mediana: team.statistics.corners.mediana,
      corners_desviacion: team.statistics.corners.desviacion,
      shots_total: team.statistics.shots.total,
      shots_promedio: team.statistics.shots.promedio,
      shots_mediana: team.statistics.shots.mediana,
      shots_desviacion: team.statistics.shots.desviacion,
      shotsOnTarget_total: team.statistics.shotsOnTarget.total,
      shotsOnTarget_promedio: team.statistics.shotsOnTarget.promedio,
      shotsOnTarget_mediana: team.statistics.shotsOnTarget.mediana,
      shotsOnTarget_desviacion: team.statistics.shotsOnTarget.desviacion,
      possession_total: team.statistics.possession.total,
      possession_promedio: team.statistics.possession.promedio,
      possession_mediana: team.statistics.possession.mediana,
      possession_desviacion: team.statistics.possession.desviacion,
      fouls_total: team.statistics.fouls.total,
      fouls_promedio: team.statistics.fouls.promedio,
      fouls_mediana: team.statistics.fouls.mediana,
      fouls_desviacion: team.statistics.fouls.desviacion,
      received_goals_total: team.received.goals.total,
      received_goals_promedio: team.received.goals.promedio,
      received_goals_mediana: team.received.goals.mediana,
      received_goals_desviacion: team.received.goals.desviacion,
      received_offsides_total: team.received.offsides.total,
      received_offsides_promedio: team.received.offsides.promedio,
      received_offsides_mediana: team.received.offsides.mediana,
      received_offsides_desviacion: team.received.offsides.desviacion,
      received_yellowCards_total: team.received.yellowCards.total,
      received_yellowCards_promedio: team.received.yellowCards.promedio,
      received_yellowCards_mediana: team.received.yellowCards.mediana,
      received_yellowCards_desviacion: team.received.yellowCards.desviacion,
      received_corners_total: team.received.corners.total,
      received_corners_promedio: team.received.corners.promedio,
      received_corners_mediana: team.received.corners.mediana,
      received_corners_desviacion: team.received.corners.desviacion,
      received_shots_total: team.received.shots.total,
      received_shots_promedio: team.received.shots.promedio,
      received_shots_mediana: team.received.shots.mediana,
      received_shots_desviacion: team.received.shots.desviacion,
      received_shotsOnTarget_total: team.received.shotsOnTarget.total,
      received_shotsOnTarget_promedio: team.received.shotsOnTarget.promedio,
      received_shotsOnTarget_mediana: team.received.shotsOnTarget.mediana,
      received_shotsOnTarget_desviacion: team.received.shotsOnTarget.desviacion,
      received_possession_total: team.received.possession.total,
      received_possession_promedio: team.received.possession.promedio,
      received_possession_mediana: team.received.possession.mediana,
      received_possession_desviacion: team.received.possession.desviacion,
      received_fouls_total: team.received.fouls.total,
      received_fouls_promedio: team.received.fouls.promedio,
      received_fouls_mediana: team.received.fouls.mediana,
      received_fouls_desviacion: team.received.fouls.desviacion,
    }));
  
    // Crear libro de trabajo y hoja de cálculo
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  
    // Agregar el filtro a las columnas
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    worksheet['!autofilter'] = { ref: XLSX.utils.encode_range(range) };
  
    // Agregar hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Equipos");
  
    // Descargar archivo Excel
    XLSX.writeFile(workbook, "equipos.xlsx");
  };