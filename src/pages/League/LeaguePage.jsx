import { useEffect, useState } from "react";
import { AdminLeague } from "./AdminLeague";
import FormSeason from "../../componts/FormSeason";
import FormAdminSeasonWithTeams from "../../componts/FormAdminSeasonWithTeams";
import { Tabs, Tab } from "@mui/material";
import { useBoundStore } from "../../stores";
import CreateZone from "./CreateZone";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export const LeaguePage = () => {
  // const { leagues, fetchLeagues } = crateLeagueStore((state) => state);
  const { fetchLeagues } = useBoundStore((state) => state);

  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <>
      <div>LeaguePage</div>

      <div>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Tabs">
          <Tab label="Crar ligas" />
          <Tab label="Crear temporadas" />
          <Tab label="Agregar equipos a las temporadas" />
          <Tab label="Crear zonas" />
        </Tabs>
        {/* Contenido de las pestañas */}
        {activeTab === 0 && <AdminLeague />}
        {activeTab === 1 && <FormSeason />}
        {activeTab === 2 && <FormAdminSeasonWithTeams />}
        {activeTab === 3 && <CreateZone />}
      </div>
    </>
  );
};
