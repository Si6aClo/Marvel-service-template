import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import ErrorMessage from '../../errorMessage/errorMessage';
import Spinner from '../../spinner/Spinner';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState({});

    const { loading, error, getComicById, clearError } = useMarvelService();

    useEffect(() => {
        generateComic();
    }, [comicId]);

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const generateComic = () => {
        clearError();
        getComicById(comicId)
            .then(onComicLoaded);
    }

    return (
        <div className="single-comic">
            {error ? <ErrorMessage /> :
                (loading ? <Spinner /> :
                    <>
                        <img src={comic.thumb} alt={comic.name} className="single-comic__img" />
                        <div className="single-comic__info">
                            <h2 className="single-comic__name">{comic.name}</h2>
                            <p className="single-comic__descr">{comic.description}</p>
                            <p className="single-comic__descr">{comic.pages} pages</p>
                            <p className="single-comic__descr">Language: {comic.languages}</p>
                            <div className="single-comic__price">{comic.price}$</div>
                        </div>
                        <Link to={'/comics'} className="single-comic__back">Back to all</Link>
                    </>
                )
            }

        </div>
    )
}

export default SingleComicPage;