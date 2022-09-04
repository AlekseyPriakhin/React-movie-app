import React, {useState} from "react";

import styles from '../styles/searchByIdPage.css'

import {fetchMovies} from '../services/MoviesAPI'
import { URLBuilder } from "../services/URLBuilder";
import { Movie } from "../components/Movie";

const SearchByIdPage = () =>
{

    const [id,setId] = useState('')
    const [movie,setMovie] = useState();
    const [errorMessage,setErrorMessage] = useState('')

    document.onkeydown = (evt) => {
        if(evt.key === 'Enter')
        {
            searchButtonHandler();
        }
    }

    const searchButtonHandler = async () =>
    {
        setMovie('');
        setErrorMessage('');

        const url = new URLBuilder()
        .searchById(id);
        const result = await fetchMovies(url);
        

        if(result.Response === 'False')
        {
            setErrorMessage(result.Error);
        }
        else 
        {
            setMovie(result);
        }
    }


    return (
    <>
        <div className={styles['id-form']}>
            <label 
            className={styles['label']}
        >
            IMDB Movie id 
        </label>
        <input 
            className={styles['id-input']}
            placeholder='tt7131622' 
            onChange={(evt)=> setId(evt.target.value)}

        /> 
        {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
        <button 
            className={styles['search-btn']}
            onClick={()=>searchButtonHandler()}
        >
            Поиск 
        </button>
        </div>
        {movie && ( <Movie movie={movie}/>)}
    </>
    )
}

export {SearchByIdPage}