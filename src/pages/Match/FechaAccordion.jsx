/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Divider, Container } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { SelectedCurrentFecha } from './SelectedCurrentFecha';
import FormAddResult from './FormAddResult';

export const FechaAccordion = ({ fecha, idSeason, currentFechaId, setCurrentFechaId }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFechaSelection = () => {
    setCurrentFechaId(fecha._id);
  };

  return (
    <Container key={fecha._id}>
    
      <Accordion sx={{marginY:"1.5rem",backgroundColor: '#f5f5f5'}} expanded={isExpanded} onChange={handleChange}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls={`panel-${fecha._id}-content`}
          id={`panel-${fecha._id}-header`}
        >
          <Typography>Fecha {fecha.number}  <SelectedCurrentFecha
          fechaId={fecha._id}
          idSeason={idSeason}
          isCurrent={fecha._id === currentFechaId}
          setCurrentFechaId={setCurrentFechaId}
        /></Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          {fecha.matches.map((match) => (
            <Accordion key={match._id}>
              <AccordionSummary
               sx={{ marginY:"0.5rem"}}
                expandIcon={<ExpandMore />}
                aria-controls={`panel-${match._id}-content`}
                id={`panel-${match._id}-header`}
              >
                <Typography>
                  {match.homeTeam.name} - {match.awayTeam.name}
                </Typography>
                {match.isFinished ? (
                  <Typography sx={{ marginLeft: "1rem" }}>
                    {match.teamStatistics.local.goals} -{" "}
                    {match.teamStatistics.visitor.goals}
                  </Typography>
                ) : null}
              </AccordionSummary>
              <AccordionDetails>
                <FormAddResult
                  matchId={match._id}
                  localName={match.homeTeam.name}
                  visitorName={match.awayTeam.name}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
   
    </Container>
  );
};
