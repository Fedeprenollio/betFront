import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState('panel1');

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : '');
  };

  return (
    <div>
      <Button sx={{ color: "inherit" }} onClick={toggleDrawer(true)}>Destacado</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={(event) => event.stopPropagation()}
            >
              <Typography>Argentina</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Primera Division" />
                  </ListItemButton>
                </ListItem>
                <List component="div" disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SportsSoccerIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Link to={`/stats/teams/tableSeason/66418be029b5580180cd252a`}>
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
                      <ListItemText>
                        <Link to={`/league/detail/66418b5929b5580180cd24ec`}>
                          Resultados
                        </Link>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Copa de la Liga" />
                  </ListItemButton>
                </ListItem>
                <List component="div" disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SportsSoccerIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Link to={`/league/Copa de la Liga/stats`}>
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
                      <ListItemText>
                        <Link to={`/league/Copa de la Liga/results`}>
                          Resultados
                        </Link>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              onClick={(event) => event.stopPropagation()}
            >
              <Typography>España</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="La Liga" />
                  </ListItemButton>
                </ListItem>
                <List component="div" disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SportsSoccerIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Link to={`/league/La Liga/stats`}>
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
                      <ListItemText>
                        <Link to={`/league/La Liga/results`}>
                          Resultados
                        </Link>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
              onClick={(event) => event.stopPropagation()}
            >
              <Typography>Inglaterra</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Premier Ligue" />
                  </ListItemButton>
                </ListItem>
                <List component="div" disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SportsSoccerIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Link to={`/league/Premier Ligue/stats`}>
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
                      <ListItemText>
                        <Link to={`/league/Premier Ligue/results`}>
                          Resultados
                        </Link>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </div>
  );
}
