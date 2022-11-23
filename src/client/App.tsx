import React, { useEffect, useState } from 'react'
import Login from './component/Login'
import { Grid } from '@mui/material'

const App: React.FC = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const localToken: string = localStorage.getItem('token')
    setToken(localToken)
  })

  return (
    <h1>
      <Grid
        container
        spacing={0}
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          {!token ? <Login /> : <h1>Todo</h1>}
        </Grid>
      </Grid>
    </h1>
  )
}

export default App
