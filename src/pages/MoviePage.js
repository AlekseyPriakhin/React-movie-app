import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'

import { fetchMovies } from '../services/MoviesAPI';
import { URLBuilder } from '../services/URLBuilder';

import { Movie } from "../components/Movie";
import styles from '../styles/moviePage.css'

const MoviePage = () => {
    const [ movie, setMovie ] = useState();
    const { id } = useParams();

    useEffect(() => {
        const url = new URLBuilder().
            searchById(id);

        fetchMovies(url)
            .then(res => setMovie(res));
    }, [])


    return (
        <>
            <Link
                className={styles['back']}
                to='/title'
            >
                Назад
            </Link>
            {!movie && <p>Loading....</p>}
            {movie && <Movie movie={movie}/>}
        </>
    )
}

export { MoviePage }
