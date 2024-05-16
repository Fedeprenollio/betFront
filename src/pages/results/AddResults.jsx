import { Container } from '@mui/material'
import React, { useState } from 'react'
import { FilterLeague } from '../../componts/Filters/FilterLeague'

export const AddResults = () => {
    const [filteredLeagues, setFilteredLeagues] = useState([]);
    const getSortedLeagues = ({ leagues }) => {
        const sortedLeagues = [...leagues].sort((a, b) => {
          if (a.country < b.country) return -1;
          if (a.country > b.country) return 1;
          return 0;
        });
        return sortedLeagues;
      };
    
  return (
    <Container>
        <FilterLeague
        setFilteredLeagues={setFilteredLeagues}
        getSortedLeagues={getSortedLeagues}
      />


    </Container>
  )
}
