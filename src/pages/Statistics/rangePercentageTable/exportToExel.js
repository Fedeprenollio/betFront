import * as XLSX from "xlsx";

const exportToExcel = (data, statisticName, matchesType) => {
  console.log("matchesType", matchesType);
  console.log("DATA DE EXCEL", data);

  // Aplanar los datos de overRanges y underRanges
  const flattenRanges = (ranges, prefix) => {
    if (!ranges) return {};
    return Object.entries(ranges).reduce((acc, [key, value]) => {
      if (ranges.hasOwnProperty(key) && value.percentage !== undefined) {
        acc[`${prefix}_${key}`] = value.percentage;
      }
      return acc;
    }, {});
  };
  // Transformar los datos
  const dataToExport = data.map(({ team, ...stats }) => {
    console.log("...stats", stats);
    const flattenStats = () => {
      const receivedFlattened = flattenRanges(stats, "received");
      const scoredFlattened = flattenRanges(stats, "scored");
      console.log("scoredFlattened", scoredFlattened);
      if (matchesType === "scored") {
        return {
          // totalReceived: stats['totalReceived'],
          ["Total Marcado"]: stats["totalScored"],
          PJ: stats["matchesTotalFinished"],
          Promedio:
            stats.totalScored / stats.matchesTotalFinished ||
            stats.totalReceived / stats.matchesTotalFinished,
          Mediana: stats["medianValue"],

          // ...receivedFlattened,
          ...scoredFlattened,
        };
      } else if (matchesType === "received") {
        return {
          ["Total Recibido"]: stats["totalReceived"],
          // totalScored: stats['totalScored'],
          PJ: stats["matchesTotalFinished"],
          Promedio: stats.totalReceived / stats.matchesTotalFinished,
          Mediana: stats["medianValue"],
          ...receivedFlattened,
          // ...scoredFlattened,
        };
      }
    };
    const allStats = {
      ...flattenStats(),
    };

    return {
      teamName: team?.name || "",
      country: team?.country || "",
      league: team?.league || "",
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
  let colHeaders;
  if (matchesType === "scored") {
    colHeaders = [
      "teamName",
      "country",
      "league",
      "Total Marcado",
      "PJ",
      "Promedio",
      "Mediana",
      ...Object.keys(dataToExport[0]).filter(
        (key) =>
          ![
            "teamName",
            "country",
            "league",
            "Total Recibido",
            "Total Marcado",
            "PJ",
            "Promedio",
            "Mediana",
          ].includes(key)
      ),
    ];
  } else if (matchesType === "received") {
    colHeaders = [
      "teamName",
      "country",
      "league",
      "Total Recibido",
      "PJ",
      "Promedio",
      "Mediana",
      ...Object.keys(dataToExport[0]).filter(
        (key) =>
          ![
            "teamName",
            "country",
            "league",
            "Total Recibido",
            "Total Marcado",
            "PJ",
            "Promedio",
            "Mediana",
          ].includes(key)
      ),
    ];
  }

  XLSX.utils.sheet_add_aoa(worksheet, [colHeaders], { origin: "A1" });

  // Agregar filtros a las columnas
  worksheet["!autofilter"] = {
    ref: "A1:" + XLSX.utils.encode_col(colHeaders.length - 1) + "1",
  };

  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!worksheet[cell_ref]) continue;
        worksheet[cell_ref].s = {
            font: { name: "Arial", sz: 40, bold: R === 0 },
            alignment: { vertical: "center", horizontal: "center" },
            border: {
                top: { style: "thin", color: { rgb: "0000450" } },
                bottom: { style: "thin", color: { rgb: "000120" } },
                left: { style: "thin", color: { rgb: "001500" } },
                right: { style: "thin", color: { rgb: "000000" } },
            },
            fill: { fgColor: { rgb: R === 0 ? "FFFFCC" : "FFFFFF" } }, // Color de fondo amarillo claro para la primera fila
        };
    }
}


  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, statisticName);

  // Exportar el archivo
  XLSX.writeFile(workbook, "Estadisticas porcentuales.xlsx");
};

export default exportToExcel;
