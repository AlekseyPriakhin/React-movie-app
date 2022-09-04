import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/movieList.css'
import poster from '../poster.jpg'

const MovieList = (props) =>
{
    return (
        <ul className={styles['movies-list']}>
        {
            props.notFoundStatus && <p> По данному запросу ничего не найдено </p>
        }
        
        {
            props.movies.map((m) =>
            (
                <div key={m.imdbID} className={styles['movies-list-item']}>
                    <img src={m.Poster !== 'N/A' ? m.Poster : poster} alt={m.Title} className={styles['movie-poster']} />
                    <Link to={`/movie/${m.imdbID}`} className={styles['link-to-movie']}>{m.Title}</Link>
                    <p className={styles['movie-year']}>{m.Year}</p>
                </div>
            )
            )
        }
    </ul>
    )
}


export {MovieList}