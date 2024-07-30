// export const getComparator = (order, orderBy) =>
//     order === "desc"
//       ? (a, b) => descendingComparator(a, b, orderBy)
//       : (a, b) => -descendingComparator(a, b, orderBy);
  
//  export const stableSort = (array, comparator) => {
//   console.log("array, comparator",array)
//     const stabilizedThis = array?.map((el, index) => [el, index]);
//     stabilizedThis?.sort((a, b) => {
//       const order = comparator(a[0], b[0]);
//       if (order !== 0) return order;
//       return a[1] - b[1];
//     });
//     console.log("stabilizedThis",stabilizedThis)
//     return stabilizedThis?.map((el) => el[0]);
//   };
  
  

//   const descendingComparator = (a, b, orderBy) => {
//     console.log("orderBy",orderBy)
//     let valueA, valueB;
//     switch (orderBy) {
//       case "total":
//         valueA = a.team?.totalScored ? a.team.totalScored.toLowerCase() : "";
//         valueB = b.team?.totalScored ? b.team.totalScored.toLowerCase() : "";
//         break;
//       case "team.country":
//         valueA = a.team?.country ? a.team.country.toLowerCase() : "";
//         valueB = b.team?.country ? b.team.country.toLowerCase() : "";
//         break;
//       case "team.name":
//         valueA = a.team?.name ? a.team.name.toLowerCase() : "";
//         valueB = b.team?.name ? b.team.name.toLowerCase() : "";
//         break;
//       case "mediaFavor":
//         valueA =
//           a.matchesTotalFinished !== 0
//             ? a.totalScored / a.matchesTotalFinished
//             : 0;
//         valueB =
//           b.matchesTotalFinished !== 0
//             ? b.totalScored / b.matchesTotalFinished
//             : 0;
//         break;
//       case "mediaContra":
//         valueA =
//           a.matchesTotalFinished !== 0
//             ? a.totalReceived / a.matchesTotalFinished
//             : 0;
//         valueB =
//           b.matchesTotalFinished !== 0
//             ? b.totalReceived / b.matchesTotalFinished
//             : 0;
//         break;
//       case "mediaTotal":
//         valueA =
//           a.matchesTotalFinished !== 0
//             ? (a.totalScored + a.totalReceived) / a.matchesTotalFinished
//             : 0;
//         valueB =
//           b.matchesTotalFinished !== 0
//             ? (b.totalScored + b.totalReceived) / b.matchesTotalFinished
//             : 0;
//         break;
//       default:
//         valueA =
//           orderBy.includes("over-") || orderBy.includes("under-")
//             ? a[orderBy]?.percentage || 0
//             : a[orderBy] || 0;
//         valueB =
//           orderBy.includes("over-") || orderBy.includes("under-")
//             ? b[orderBy]?.percentage || 0
//             : b[orderBy] || 0;
//     }
//     console.log(" a[orderBy]?.percentage", a)
//   console.log("valueB",valueB, valueA)
//     if (valueB < valueA) return -1;
//     if (valueB > valueA) return 1;
//     return 0;
//   };
  

export const getComparator = (order, orderBy) =>
  order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

export const stableSort = (array, comparator) => {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
};

const descendingComparator = (a, b, orderBy) => {
  console.log("orderBy", orderBy);
  let valueA, valueB;
  switch (orderBy) {
    case "total":
      valueA = a.team?.totalScored ? parseFloat(a.team.totalScored) : 0;
      valueB = b.team?.totalScored ? parseFloat(b.team.totalScored) : 0;
      break;
    case "team.country":
      valueA = a.team?.country ? a.team.country.toLowerCase() : "";
      valueB = b.team?.country ? b.team.country.toLowerCase() : "";
      break;
    case "team.name":
      valueA = a.team?.name ? a.team.name.toLowerCase() : "";
      valueB = b.team?.name ? b.team.name.toLowerCase() : "";
      break;
    case "mediaFavor":
      valueA = a.matchesTotalFinished !== 0 ? a.totalScored / a.matchesTotalFinished : 0;
      valueB = b.matchesTotalFinished !== 0 ? b.totalScored / b.matchesTotalFinished : 0;
      break;
    case "mediaContra":
      valueA = a.matchesTotalFinished !== 0 ? a.totalReceived / a.matchesTotalFinished : 0;
      valueB = b.matchesTotalFinished !== 0 ? b.totalReceived / b.matchesTotalFinished : 0;
      break;
    case "mediaTotal":
      valueA = a.matchesTotalFinished !== 0 ? (a.totalScored + a.totalReceived) / a.matchesTotalFinished : 0;
      valueB = b.matchesTotalFinished !== 0 ? (b.totalScored + b.totalReceived) / b.matchesTotalFinished : 0;
      break;
    default:
      if (orderBy.includes("over-") || orderBy.includes("under-")) {
        valueA = a[orderBy]?.percentage ? parseFloat(a[orderBy].percentage) : 0;
        valueB = b[orderBy]?.percentage ? parseFloat(b[orderBy].percentage) : 0;
      } else {
        valueA = a[orderBy] ? parseFloat(a[orderBy]) : 0;
        valueB = b[orderBy] ? parseFloat(b[orderBy]) : 0;
      }
      break;
  }
  console.log("valueA", valueA, "valueB", valueB);
  if (valueB < valueA) return -1;
  if (valueB > valueA) return 1;
  return 0;
};

// Verificación y pruebas
// Asegúrate de que `order` y `orderBy` se estén pasando correctamente a `getComparator` y `stableSort`

export const handleSortRequest = (order, orderBy, data) => {
  const comparator = getComparator(order, orderBy);
  const sortedData = stableSort(data, comparator);
  console.log("Sorted Data", sortedData);
  return sortedData;
};
