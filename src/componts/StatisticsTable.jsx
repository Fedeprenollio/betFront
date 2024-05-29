/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(name, Goles, Amarillas, Rojas, Corners, price) {
  return {
    name,
    Goles,
    Amarillas,
    Rojas,
    Corners,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row({ homeStatistics, awayStatistics, name }) {
  console.log(name, homeStatistics);

  console.log(name, awayStatistics);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell component="th" scope="row">
          {name}
        </TableCell> */}
        <TableCell align="center">{homeStatistics?.total}</TableCell>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{awayStatistics?.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Veces</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Veces</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{homeStatistics?.matchesWith0}</TableCell>
                    <TableCell align="right">0</TableCell>
                    <TableCell align="right">
                      {awayStatistics?.matchesWith0}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{homeStatistics?.matchesWith0_5}</TableCell>
                    <TableCell align="right">0.5</TableCell>
                    <TableCell align="right">
                      {awayStatistics?.matchesWith6_5}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{homeStatistics?.matchesWith1_5}</TableCell>
                    <TableCell align="right">1.5</TableCell>
                    <TableCell align="right">
                      {awayStatistics?.matchesWith6_5}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{homeStatistics?.matchesWith2_5}</TableCell>
                    <TableCell align="right">2.5</TableCell>
                    <TableCell align="right">
                      {awayStatistics?.matchesWith6_5}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{homeStatistics?.matchesWith3_5}</TableCell>
                    <TableCell align="right">3.5</TableCell>
                    <TableCell align="right">
                      {awayStatistics?.matchesWith6_5}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{homeStatistics?.matchesWith4_5}</TableCell>
                    <TableCell align="right">4.5</TableCell>
                    <TableCell align="right">
                      {awayStatistics?.matchesWith6_5}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{homeStatistics?.matchesWith5_5}</TableCell>
                    <TableCell align="right">5.5</TableCell>
                    <TableCell align="right">
                      {awayStatistics?.matchesWith6_5}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{homeStatistics?.matchesWith6_5}</TableCell>
                    <TableCell align="right">6.5</TableCell>
                    <TableCell align="right">
                      {awayStatistics?.matchesWith6_5}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{homeStatistics?.matchesWith7_5}</TableCell>
                    <TableCell align="right">7.5</TableCell>
                    <TableCell align="right">
                      {awayStatistics?.matchesWith7_5}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{homeStatistics?.matchesWith8_5}</TableCell>
                    <TableCell align="right">8.5</TableCell>
                    <TableCell align="right">
                      {awayStatistics?.matchesWith8_5}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{homeStatistics?.matchesWith9_5}</TableCell>
                    <TableCell align="right">9.5</TableCell>
                    <TableCell align="right">
                      {awayStatistics?.matchesWith9_5}
                    </TableCell>
                  </TableRow>
                  
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}



export default function StatisticsTable({ homeStatistics, awayStatistics }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">-</TableCell>
            <TableCell align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row
            homeStatistics={homeStatistics.goals}
            awayStatistics={awayStatistics.goals}
            name="Goles"
          />
          <Row
            homeStatistics={homeStatistics.offsides}
            awayStatistics={awayStatistics.offsides}
            name="Offsides"
          />
          <Row
            homeStatistics={homeStatistics.yellowCards}
            awayStatistics={awayStatistics.yellowCards}
            name="Amarillas"
          />
          <Row
            homeStatistics={homeStatistics.redCards}
            awayStatistics={awayStatistics.redCards}
            name="Rojas"
          />
          <Row
            homeStatistics={homeStatistics.corners}
            awayStatistics={awayStatistics.corners}
            name="Corners"
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
