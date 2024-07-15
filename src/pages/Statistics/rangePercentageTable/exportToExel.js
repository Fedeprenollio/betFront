import * as XLSX from 'xlsx';

const exportToExcel = (data, statisticName) => {
  // Aplanar los datos de overRanges y underRanges
  const flattenRanges = (ranges, prefix) => {
    if (!ranges) return {};
    return Object.entries(ranges).reduce((acc, [key, value]) => {
      // Verificar si la clave es válida (no fuera de los rangos conocidos)
      if (ranges.hasOwnProperty(key)) {
        acc[`${prefix}_Range_${key.replace('_', '-')}_percentage`] = value.percentage;
      }
      return acc;
    }, {});
  };

  // Transformar los datos
  const dataToExport = data.map(({ team, stats }) => {
    const flattenStats = (statKey) => {
      const statData = stats[statKey] || {};
      const receivedFlattened = flattenRanges(statData.received?.overRanges, 'received_over');
      const scoredFlattened = flattenRanges(statData.scored?.overRanges, 'scored_over');
      const totalFlattened = flattenRanges(statData.total?.overRanges, 'total_over');
      const receivedUnderFlattened = flattenRanges(statData.received?.underRanges, 'received_under');
      const scoredUnderFlattened = flattenRanges(statData.scored?.underRanges, 'scored_under');
      const totalUnderFlattened = flattenRanges(statData.total?.underRanges, 'total_under');
      
      return {
        ...receivedFlattened,
        ...scoredFlattened,
        ...totalFlattened,
        ...receivedUnderFlattened,
        ...scoredUnderFlattened,
        ...totalUnderFlattened,
      };
    };

    // Combinar todas las estadísticas
    const allStats = Object.keys(stats).reduce((acc, key) => {
      return { ...acc, ...flattenStats(key) };
    }, {});

    return {
      teamName: team.name,
      country: team.country,
      league: team.league,
      ...allStats,
    };
  });

  // Crear worksheet y workbook
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);

  // Añadir encabezados explícitos a la primera fila del worksheet
  const colHeaders = [
    'teamName',
    'country',
    'league',
    ...Object.keys(dataToExport[0]).filter(key => key.startsWith('received_') || key.startsWith('scored_') || key.startsWith('total_')),
  ];

  XLSX.utils.sheet_add_aoa(worksheet, [colHeaders], { origin: 'A1' });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, statisticName);

  // Exportar el archivo
  XLSX.writeFile(workbook, 'statistics.xlsx');
};

export default exportToExcel;
