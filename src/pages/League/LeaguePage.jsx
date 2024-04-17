import React, { useEffect, useState } from "react";
import { AdminLeague } from "./AdminLeague";
import crateLeagueStore from "../../stores/leagueStore";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { AdmintSeason } from "./AdmintSeason";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import FormSeason from "../../componts/FormSeason";
import FormAdminSeasonWithTeams from "../../componts/FormAdminSeasonWithTeams";
import { Tabs, Tab } from '@mui/material';
import { useBoundStore } from "../../stores";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export const LeaguePage = () => {
  // const { leagues, fetchLeagues } = crateLeagueStore((state) => state);
  const { leagues, fetchLeagues } = useBoundStore ( state=> state)


  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };  return (
    <>
      <div>LeaguePage</div>

      {/* {leagues.map((league) => {
        return (
          <Accordion
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}
            key={league._id}
            sx={{ backgroundColor: "green", color: "white", margin: "8px 0 " }}
          >
            <AccordionSummary>
              {league.country} - {league.name}
            </AccordionSummary>

            {league.season?.map((l) => {
              return (
                <AccordionSummary key={l._id}> {l.year} </AccordionSummary>
              );
            })}
          </Accordion>
        );
      })} */}

      {/* <AdmintSeason /> */}
      <div>AdmintSeason - agregar una tempordada a una liga y sus equipos </div>
      <h3>ahora agregamos equipos a la temporada</h3>
      {/* <AdminLeague />
      <FormSeason />
      <FormAdminSeasonWithTeams /> */}
       <div>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="Tabs">
        <Tab label="Crar ligas" />
        <Tab label="Crear temporadas" />
        <Tab label="Agregar equipos a las temporadas" />
      </Tabs>
      {/* Contenido de las pestañas */}
      {activeTab === 0 && <AdminLeague />}
      {activeTab === 1 && <FormSeason />}
      {activeTab === 2 && <FormAdminSeasonWithTeams />}
    </div>
    </>
  );
};

{
  /* <Accordion>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1-content"
    id="panel1-header"
  >
    Accordion 1
  </AccordionSummary>
  <AccordionDetails>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    malesuada lacus ex, sit amet blandit leo lobortis eget.
  </AccordionDetails>
</Accordion>; */
}
