/* eslint-disable react/prop-types */
import { Container } from "@mui/material";
import { MatchsStack } from "./MatchsStack";

const MatchList = ({date}) => {
  // const { matches } = useMatchesStore();
  return <MatchsStack date={date}/>;
};

export default MatchList;
