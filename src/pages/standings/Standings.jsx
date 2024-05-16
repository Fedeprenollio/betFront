/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useBoundStore } from "../../stores";

export const Standings = ({seasonId= "6637dbf7b2a2deab04a69a97"}) => {
    const {  getTableSeason,tableSeason } = useBoundStore(
        (state) => state
      );


      useEffect(() => {
        getTableSeason({seasonId})
      }, [seasonId])
      console.log("tableSeason",tableSeason)
  return (
    <div>
        <h2>Tabla de posuciones</h2>

        {/* {tableSeason?.table?.map( t=> {
            return (
                <h3 key={t.team._id}>{t.team.name} - Ptos: {t.allStats?.points}</h3>
            )
        })} */}

    </div>
  )
}
