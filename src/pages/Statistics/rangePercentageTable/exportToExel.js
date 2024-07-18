import * as XLSX from 'xlsx';

const exportToExcel = (data, statisticName) => {
  console.log("DATA DE EXCEL", data);

  // Aplanar los datos de overRanges y underRanges
  const flattenRanges = (ranges, prefix) => {
    if (!ranges) return {};
    return Object.entries(ranges).reduce((acc, [key, value]) => {
      if (ranges.hasOwnProperty(key)) {
        acc[`${prefix}_${key}`] = value.percentage;
      }
      return acc;
    }, {});
  };

  // Transformar los datos
  const dataToExport = data.map(({ team, ...stats }) => {
    const flattenStats = () => {
      const receivedFlattened = flattenRanges(stats, 'received');
      const scoredFlattened = flattenRanges(stats, 'scored');
      
      return {
        totalReceived: stats['totalReceived'],
        totalScored: stats['totalScored'],
        matchesTotalFinished: stats['matchesTotalFinished'],
        medianValue: stats['medianValue'],
        ...receivedFlattened,
        ...scoredFlattened,
      };
    };

    const allStats = {
      ...flattenStats(),
    };

    return {
      teamName: team?.name || '',
      country: team?.country || '',
      league: team?.league || '',
      ...allStats,
    };
  });

  if (dataToExport.length === 0) {
    console.warn("No data available to export");
    return;
  }

  // Crear worksheet y workbook
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);

  // Añadir encabezados explícitos a la primera fila del worksheet
  const colHeaders = [
    'teamName',
    'country',
    'league',
    'totalReceived',
    'totalScored',
    'matchesTotalFinished',
    'medianValue',
    ...Object.keys(dataToExport[0]).filter(key => !['teamName', 'country', 'league', 'totalReceived', 'totalScored', 'matchesTotalFinished', 'medianValue'].includes(key)),
  ];

  XLSX.utils.sheet_add_aoa(worksheet, [colHeaders], { origin: 'A1' });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, statisticName);

  // Exportar el archivo
  XLSX.writeFile(workbook, 'statistics.xlsx');
};

export default exportToExcel;
