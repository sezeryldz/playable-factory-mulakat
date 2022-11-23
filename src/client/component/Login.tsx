import React from 'react'
import { TextField, Button, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
const Login = () => {
  interface ILogin {
    email: string
    password: string
  }

  const { register, handleSubmit } = useForm<ILogin>()

  const handleLogin = async (data: ILogin) => {
    const res = await axios.post('users/login', data)
    const token = res.data.accessToken
    localStorage.setItem('token', token)

    if (token) {
      window.location.href = '/todo'
    } else {
      window.location.reload()
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                id='outlined-basic'
                label='email'
                variant='outlined'
                {...register('email')}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id='outlined-basic'
                label='password'
                variant='outlined'
                type='password'
                {...register('password')}
              />
            </Grid>
            <Grid item xs={8}>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  )
}

export default Login
