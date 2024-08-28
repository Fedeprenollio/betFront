import React, { useEffect, useState } from 'react'
import { List, ListItem, ListItemText, CircularProgress, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL_BASE } from '../../stores/url_base'

export const RefereePage = () => {
  const [referees, setReferees] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchReferees = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL_BASE}/referees`) // Ruta para obtener árbitros
        setReferees(response.data)
      } catch (error) {
        console.error('Error fetching referees:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReferees()
  }, [])

  const handleRefereeClick = (refereeId) => {
    navigate(`/referee/${refereeId}/statistics`) // Redirige a la página de estadísticas del árbitro
  }

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {referees.map((referee) => (
            <ListItem button key={referee._id} onClick={() => handleRefereeClick(referee._id)}>
              <ListItemText primary={referee.name} secondary={referee.nationality} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  )
}
