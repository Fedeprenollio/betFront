import { Container } from '@mui/material'
import React from 'react'
import FormUser from './FormUser'

export const Register = () => {
  return (
    <Container>
        <h1>Registro</h1>

        <FormUser action="register" />


    </Container>
  )
}
