import React from "react";
import logo from '../logo.jpg'
import { NavLink, Outlet} from 'react-router-dom'
import styles from "../styles/navigation.css"

const Navigation = () => {
   
    {
        return (
        <>
            <header className={styles['nav']}>
                <img className={styles['app-logo']} src={logo}></img>
                <ul className={styles['link-list']}>
                    <NavLink className={styles['link']} to='/'>APP</NavLink>
                    <NavLink className={styles['link']} to="/id">Поиск по Id</NavLink>
                    <NavLink className={styles['link']} to="/title">Поиск по названию</NavLink>
                </ul> 
            </header>

            <main className={styles['wrapper']}>
                <Outlet />
            </main>

        </>
    )
    }
    
}

export { Navigation }