import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [skip, setSkip] = useState(0);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        generateComics();
    }, []);

    const generateComics = () => {
        getAllComics(skip)
            .then(comicsLoaded)
    }

    const comicsLoaded = (res) => {
        setComics(comics => [...comics, ...res]);
        setSkip(skip => skip + 8);
    }

    let allComics = []

    if (comics.length > 0) {
        allComics = comics.map(item => {
            return <li className="comics__item" key={item.id}>
                <Link to={'' + item.id}>
                    <img src={item.thumb} alt={item.name} className="comics__item-img" />
                    <div className="comics__item-name">{item.name}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
        })
    }

    console.log(allComics);

    return (
        <div className="comics__list">
            {error ? <ErrorMessage /> :
                <>
                    <ul className="comics__grid">
                        {allComics}
                    </ul>
                    {loading ? <Spinner /> :
                        <button onClick={generateComics} className="button button__main button__long">
                            <div className="inner">load more</div>
                        </button>
                    }

                </>
            }

        </div>
    )
}

export default ComicsList;