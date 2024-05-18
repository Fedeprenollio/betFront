import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useBoundStore } from "../../stores";
import { useState } from "react";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function TemporaryDrawer() {
  const { fetchLeagues, leagues } = useBoundStore((state) => state);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState("panel1");
  const [countries, setCountries] = useState([]);

  React.useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  React.useEffect(() => {
    const uniqueCountries = new Set(leagues.map((league) => league.country));
    setCountries([...uniqueCountries]);
  }, [leagues]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };

  return (
    <div>
      {/* <Button sx={{ color: "inherit" }} onClick={toggleDrawer(true)}>Destacado</Button> */}
      <IconButton sx={{ color: "inherit" }} onClick={toggleDrawer(true)}>
        <StarIcon /> {/* Cambia StarIcon por el icono que desees */}
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          {countries.map((country, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index + 1}`}
              onChange={handleAccordionChange(`panel${index + 1}`)}
            >
              <AccordionSummary
             
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}a-content`}
                id={`panel${index + 1}a-header`}
                onClick={(event) => event.stopPropagation()}
              >
                <Typography sx={{ fontWeight: 'bold', marginTop: '4px', marginBottom: '4px' }}>{country}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {leagues
                    .filter((league) => league.country === country)
                    .map((league) => {
                      const currentSeason = league.season.find(
                        (season) => season.isCurrentSeason
                      );
                      return (
                        <React.Fragment key={league._id}>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemText primary={league.name} />
                            </ListItemButton>
                          </ListItem>
                          <List component="div" disablePadding>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <SportsSoccerIcon />
                                </ListItemIcon>
                                <ListItemText sx={{ fontSize: "small" }}>
                                  <Link
                                    className="link-no-underline"
                                    to={`/stats/teams/tableSeason/${currentSeason._id}`}
                                  >
                                    Tabla de estadísticas
                                  </Link>
                                </ListItemText>
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <SportsSoccerIcon />
                                </ListItemIcon>
                                <ListItemText sx={{ fontSize: "small" }}>
                                  <Link
                                    className="link-no-underline"
                                    to={`/league/showResults/${currentSeason._id}`}
                                  >
                                    Resultados
                                  </Link>
                                </ListItemText>
                              </ListItemButton>
                            </ListItem>
                          </List>
                        </React.Fragment>
                      );
                    })}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Drawer>
    </div>
  );
}
