import React, {useEffect} from "react"
import {
    useNavigate,
    Route,
    Routes
} from "react-router-dom";
import { SearchByTitlePage } from "./pages/searchByTitlePage.js";
import { SearchByIdPage } from "./pages/SearchByIdPage.js";
import { MoviePage } from "./pages/MoviePage.js";
import { HomePage } from "./pages/HomePage.js";
import { Navigation } from './components/Navigation.js'
import { AuthPage } from "./pages/AuthPage.js";
import { checkAuth } from "./services/AuthService.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";
import styles from './styles/app.css'
import './styles/colors.css'

export const App =()=> 
{
    const nav = useNavigate();
    useEffect(()=>
    {
        if(!checkAuth()) nav('auth',{replace:true}) 
    },[])
   
        return(
            <div className={styles['app']}>
                <Routes>
                    <Route path="/auth" element={<AuthPage/>}/>
                    <Route path="/" element={<Navigation/>}> 
                        <Route index element={<HomePage/>}/>
                        <Route path="/title" element={<SearchByTitlePage/>}/>
                        <Route path="/id" element={<SearchByIdPage/>}/>
                        <Route path="/movie/:id" element={<MoviePage/>}/>
                    </Route>
                    <Route path='/*' element={<NotFoundPage/>}/>
                </Routes>
            </div>
        )
}

