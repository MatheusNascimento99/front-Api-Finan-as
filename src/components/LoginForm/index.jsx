'use client'
import { useState } from 'react';
import * as S from './style';
import axios from 'axios';

export const LoginForm = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: ''
    });


    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'email') setEmail(value)
        if (name === 'password') setPassword(value)

    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            handleClick();
            const response = await axios.post('http://localhost:8585/auth/login', { email, password })
            localStorage.setItem('token', response.data.data.token)
            setNotification({
                open: true,
                message: `Usuário ${email} autenticado com sucesso!`,
                severity: 'success'
            })
        }
        catch (error) {
            setNotification({
                open: true,
                message: error.response.data.error,
                severity: 'error'
            })
        }
    }

   

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification({
            open: false,
            message: '',
            severity: ''
        })
    }


    return (
        <>
            <S.Form onSubmit={onSubmit}>
                <S.H1>Autenticação</S.H1>
                <S.TextField name='email' onChange={onChangeValue} label="E-mail" variant='outlined' color='primary' fullWidth />
                <S.TextField name='password' onChange={onChangeValue} type='password' label="Password" variant='outlined' color='primary' fullWidth />
                <S.Button variant="contained" color="success" type="subimit"  >Enviar</S.Button>
            </S.Form>

            <S.Snackbar open={notification.open} autoHideDuration={3000} onClose={handleClose}>
                <S.Alert onClose={handleClose} variant='filled' severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </S.Alert>
            </S.Snackbar>
        </>

    )
}

export default LoginForm;


