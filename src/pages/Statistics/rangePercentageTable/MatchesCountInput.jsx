/* eslint-disable react/prop-types */
import { Button, Container, TextField } from '@mui/material'

export const MatchesCountInput = ({ inputMatchesCount, handleInputMatchesCountChange, updateMatchesCount }) => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TextField
        label="Limitar número de partidos"
        type="number"
        value={inputMatchesCount}
        onChange={handleInputMatchesCountChange}
        variant="outlined"
        margin="normal"
        sx={{ width: '100%', maxWidth: '300px', marginBottom: '10px' }} // Ajustes de estilo para el TextField
      />
      <Button variant="contained" color="primary" onClick={updateMatchesCount} sx={{ width: '100%', maxWidth: '300px' }}>
        Actualizar
      </Button>
    </Container>
  )
}
