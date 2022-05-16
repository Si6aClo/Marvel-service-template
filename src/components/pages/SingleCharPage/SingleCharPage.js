import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import ErrorMessage from '../../errorMessage/errorMessage';
import Spinner from '../../spinner/Spinner';

import './SingleCharPage.scss';

const SingleCharPage = () => {
    const { charId } = useParams();
    const [char, setChar] = useState({});

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        generateChar();
    }, [charId]);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const generateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded);
    }

    return (
        <div className="single-char">
            {error ? <ErrorMessage /> :
                (loading ? <Spinner /> :
                    <>
                        <img src={char.thumb} alt={char.name} className="single-char__img" />
                        <div className="single-char__info">
                            <h2 className="single-char__name">{char.name}</h2>
                            <p className="single-char__descr">{char.description}</p>
                        </div>
                        <Link to={'/'} className="single-char__back">Back to all</Link>
                    </>
                )
            }

        </div>
    )
}

export default SingleCharPage;