import React, { useState, useEffect } from 'react'
import { URLBuilder } from '../services/URLBuilder';
import { fetchMovies } from '../services/MoviesAPI';
import { MovieList } from '../components/MovieList';
import { Pagination } from '../components/Pagination';
import styles from '../styles/searchByTitlePage.css'

const SearchByTitlePage = () => {

    const [title, setTitle] = useState(sessionStorage.getItem('title'));
    const [year, setYear] = useState(sessionStorage.getItem('year'));
    const [type, setType] = useState(sessionStorage.getItem('type'));
    const [page, setPage] = useState(sessionStorage.getItem('page') ? sessionStorage.getItem('page') : 1);
    const [movies, setMovies] = useState([])
    const [yearOption, setYearOption] = useState(sessionStorage.getItem('year') ? true : false);
    const [totalPages, setTotalPages] = useState(1);
    const [notFoundStatus, setNotFoundStatus] = useState(false);

    const types = [
        { value: '', text: 'Любой' },
        { value: 'movie', text: 'Фильмы' },
        { value: 'series', text: 'Серии' },
        { value: 'episode', text: 'Эпизоды' },
    ]


    const searchHandle = async () => {
        await getMoviesFromAPI(1);
        setPage(1);
        sessionStorage.setItem('page', 1);
    }

    const toPage = async (value) => {
        await getMoviesFromAPI(value);
        setPage(value);
        sessionStorage.setItem('page', value);
    }


    const getMoviesFromAPI = async (pageNum) => {

        if(title === null || title === '') 
        {
            setNotFoundStatus(true);
            setMovies([])
            setTotalPages(1);
            return;
        }
        

        const url = buildURL(pageNum);
        const result = await fetchMovies(url);
        setParamsToSessionStorage();
       
        if (result.Response === "False") {
            setMovies([])
            setNotFoundStatus(true);
            setTotalPages(1);
        }
        else {

            const newTotalPages = result.totalResults <= 10 ? 1 :
                Math.ceil(result.totalResults / 10)

            setTotalPages(newTotalPages);
            setMovies(result.Search);
            setNotFoundStatus(false);
        } 

    }

    const buildURL = (pageNum) =>
    {
        const urlBuilder = new URLBuilder().searchByTitle(title);
        if (yearOption && year) urlBuilder.withYear(year);
        if (type && type !== 'null') urlBuilder.withType(type);

        urlBuilder.onPage(pageNum);
        return urlBuilder.getUrl();
    }


    useEffect(() => {
        if (title) getMoviesFromAPI(page);
    }, [])

    const setParamsToSessionStorage = () => {
        sessionStorage.setItem('title', title);
        sessionStorage.setItem('type', type);
        sessionStorage.setItem('year', yearOption ? year : '');
    }


    return (
        <>
            <div className={styles['movie-form']}>
                <label
                    className={styles['title-label']}>
                    Название
                </label>
                <input
                    defaultValue={title}
                    className={styles['title-input']}
                    placeholder='Введите название'
                    onChange={(evt) => setTitle(evt.target.value)}
                />

                <label className={styles['type-label']}>
                    Тип
                </label>
                <select
                    className={styles['type-input']}
                    defaultValue={type}
                    onChange={(evt) => setType(evt.target.value)}
                >
                    {
                        types.map((type) =>
                            <option
                                key={type.value}
                                value={type.value}
                            >
                                {type.text}
                            </option>)
                    }
                </select>

                <label
                    className={styles['year-label']}>
                    Год выхода
                </label>
                <input
                    defaultValue={year}
                    className={styles['year-input']}
                    disabled={yearOption === false}
                    onChange={(evt) => setYear(evt.target.value)}

                />
                <div
                    className={styles['year-checkbox']}
                >
                    <label>По году</label>
                    <input
                        checked={yearOption}
                        className={styles['year-checkbox-input']}
                        type="checkbox" onChange={() => setYearOption(!yearOption)}
                    />
                </div>

                <button
                
                    className={styles['search-btn']}
                    onClick={() => searchHandle()}
                >
                    Поиск
                </button>
            </div>

            {<MovieList movies={movies} notFoundStatus={notFoundStatus}/>}

            {totalPages > 1 &&
                <Pagination
                    onPage={toPage}
                    currentPage={page}
                    totalPages={totalPages}

                />
            }
        </>
    )
}

export { SearchByTitlePage }