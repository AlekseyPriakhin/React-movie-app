


const fetchMovies = async (url) =>
{
    return await fetch(url).then(res => res.json());
}

export {fetchMovies}