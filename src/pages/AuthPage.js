import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setApiKey, checkAuth } from "../services/AuthService";
import styles from '../styles/authPage.css'

const AuthPage = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('');

    const handleClick = () => {
        setApiKey(key);
        navigate('/', { replace: true })

    }

    useEffect(() => {
        if (checkAuth()) navigate('/', { replace: true })
    }, [])

    return (
        <form
            className={styles['auth-form']}
            onSubmit={handleClick}>
            <h1>Авторизация</h1>
            <label className={styles['api-label']}>
                API Ключ
            </label>
            <input
                className={styles['api-input']}
                placeholder="Введите ключ"
                onChange={event => setKey(event.target.value)}
            />
            <button
                className={styles['auth-btn']}
                type="submit"
            >
                Войти
            </button>
        </form>
    )
}

export { AuthPage }