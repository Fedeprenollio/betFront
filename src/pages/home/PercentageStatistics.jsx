import React, { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import { RangePercentageTable } from "../Statistics/rangePercentageTable/RangePercentageTable";

export const PercentageStatistics = () => {
  const [listCurrentSeason, setListCurrentSeason] = useState("");
  const { getAllCurrentSeasons, allCurrentSeasons, error } = useBoundStore(
    (state) => state
  );
  useEffect(() => {
    getAllCurrentSeasons();
  }, [getAllCurrentSeasons]);
  useEffect(() => {
    const list = allCurrentSeasons.map((season) => season._id);
    setListCurrentSeason(list.toString());
  }, [allCurrentSeasons]);
  console.log("listCurrentSeason", listCurrentSeason);

  console.log("ERROR", error);



  return <div>PercentageStatistics

<RangePercentageTable  listCurrentSeason={listCurrentSeason}/>

  </div>;
};
