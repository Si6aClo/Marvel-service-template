import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const [comics, setComics] = useState(null);

    const {loading, getCharacterWithComics} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        getCharacterWithComics(charId)
            .then(charLoaded);
    }

    const charLoaded = ({ char, comics }) => {
        setChar(char);
        setComics(comics);
    }

    useEffect(() => {
        updateChar();
    }, [props]);

    const skeleton = char || loading ? null : <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const content = (comics && char && !loading) ? <View nchar={char} ncomics={comics} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {content}
        </div>
    )

}

const View = ({ nchar, ncomics }) => {
    const char = nchar;
    let comics = ncomics;
    console.log(comics, char);
    if (comics.length > 10) {
        comics = comics.slice(0, 10);
    }

    const allComics = comics.map((item, i) => {
        return (
            <li className="char__comics-item" key={i}>
                {item}
            </li>
        )
    });

    const isNotFound = char.thumb === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

    return (
        <>
            <div className="char__basics">
                <img src={char.thumb} object-fit={isNotFound ? "contain" : "cover"} alt="abyss" />
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {allComics.length > 0 ? allComics : "Comics not found"}
            </ul>
        </>
    )
}

export default CharInfo;