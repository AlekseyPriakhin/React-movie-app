import { getApiKey } from "./AuthService";

export class URLBuilder
{
    #url;
    constructor()
    {
        const key = getApiKey();
        this.#url = `http://www.omdbapi.com/?apikey=${key}`
    }
    
    searchById = (id) =>
    {
        this.#url += `&i=${id}`;
        return this.#url;
    }

    searchByTitle = (title) =>
    {
        this.#url += `&s=${title}`;
        return this;
    }

    withType = (type) =>
    {
        if(type) this.#url += `&type=${type}`;
        return this;
    }

    withYear = (year) =>
    {
        if(year) this.#url += `&y=${year}`;
        return this;
    }

    onPage = (page) =>
    {
        this.#url += `&page=${page}`;
        return this;
    }

    getUrl = ()=>this.#url;
}