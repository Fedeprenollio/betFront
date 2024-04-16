import React from 'react'
import FormSeason from '../../componts/FormSeason'
import AdminSeasonWithTeams from '../../componts/FormAdminSeasonWithTeams'

export const AdmintSeason = () => {
  return (
    <>
    <div>AdmintSeason - agregar una tempordada a una liga y sus equipos </div>
    <FormSeason/>
    <h3>ahora agregamos equipos a la temporada</h3>
    <AdminSeasonWithTeams/>
    </>
  )
}
