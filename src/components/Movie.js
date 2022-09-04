import React from "react";
import styles from '../styles/movie.css'


const Movie = (props) =>
{
    const movie = props.movie;

    return (
        <div className={styles['movie']}>
            <h1>{movie.Title}</h1>
            <ul className={styles['release-info']}>
                <li className={styles['release-info-item']}>
                    {movie.Year}
                </li>
                <li className={styles['release-info-item']}>
                    {movie.Runtime}
                </li>
            </ul>
            <img
                src={`${movie.Poster}`} 
                className={styles['movie-poster']}
            />

            <ul className={styles['movie-info']}>
                <li className={styles['movie-info-element']}> {
                    movie.Plot}
                </li>
                <li className={styles['movie-info-element']}>
                    Genres - {movie.Genre}
                </li>
                <li className={styles['movie-info-element']}>
                    Actors - {movie.Actors}
                </li>
                <li className={styles['movie-info-element']}>
                    Director - {movie.Director}
                </li>
                <li className={styles['movie-info-element']}>
                    Rating - {<span className={styles['rating-value']}>{movie.imdbRating}</span>}/ 10
                </li>
            </ul>
        </div>
    )
}

export {Movie}