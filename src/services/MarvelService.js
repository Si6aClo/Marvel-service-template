import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=20359ffdeff4d837c5ae5e79347188ea';

    const getAllCharacters = async (skip) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${skip}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComicsById = async (id) => {
        const res = await request(`${_apiBase}characters/${id}/comics?${_apiKey}`);
        return _transformComics(res);
    }

    const getCharacterWithComics = async (id) => {
        const res1 = await getCharacter(id);
        const res2 = await getComicsById(id);
        return { char: res1, comics: res2 };
    }

    const getAllComics = async (skip) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${skip}&${_apiKey}`);
        return _transformAllComics(res);
    }

    const getComicById = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        console.log(res);
        return _transformComic(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        if (res.data.results.length === 0) {
            return { 
                charId: null,
                name: null 
            }
        }
        return { 
            charId: res.data.results[0].id,
            name: res.data.results[0].name 
        }
    }

    const _transformComic = (res) => {
        console.log(res);
        return {
            name: res.title,
            description: res.description,
            pages: res.pageCount,
            languages: res.textObjects.map(item => (item.language)),
            price: res.prices[0].price,
            thumb: res.thumbnail.path + '.' + res.thumbnail.extension
        }
    }

    const _transformComics = (res) => {
        return res.data.results.map(item => {
            return item.title;
        })
    }

    const _transformAllComics = (res) => {
        return res.data.results.map(item => {
            return {
                id: item.id,
                name: item.title,
                price: item.prices[0].price,
                thumb: item.thumbnail.path + '.' + item.thumbnail.extension,
                url: item.urls[0].url
            }
        })
    }

    const _transformCharacter = (res) => {
        return {
            id: res.id,
            name: res.name,
            description: res.description,
            thumb: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url
        }
    }

    return {
        loading,
        error,
        getAllCharacters,
        getCharacterWithComics,
        getCharacter,
        getAllComics,
        getComicById,
        getCharacterByName,
        clearError
    }
}

export default useMarvelService;