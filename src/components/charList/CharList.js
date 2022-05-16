import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [skip, setSkip] = useState(0);
    const [activeId, setActiveId] = useState(null);

    const {loading, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onGenerateChars();
    }, []);

    const onGenerateChars = () => {
        getAllCharacters(skip)
            .then(onCharsLoaded);
    }

    const onCharsLoaded = (chars) => {
        setChars(chars);
        setSkip(skip => skip + 9);
    }

    const onLoadChars = () => {
        getAllCharacters(skip)
            .then(onAppendChars);
    }

    const onAppendChars = (items) => {
        setChars(chars => [...chars, ...items]);
        setSkip(skip => skip + 9);
    }

    const selectChar = (id) => {
        setActiveId(id);
    }

    const allCharCards = chars.map(item => {
        return (
            <li key={item.id} className={"char__item " + (activeId === item.id ? 'char__item_selected' : null)} onClick={() => {
                props.onCharSelected(item.id);
                selectChar(item.id);
            }}>
                <img src={item.thumb} alt={item.name} />
                <div className="char__name">{item.name}</div>
            </li>
        )
    })

    return (
        <div className="char__list">
            <ul className="char__grid">
                {allCharCards}
            </ul>
            {loading ? <Spinner /> : null}
            {loading ? null :
                <button className="button button__main button__long" onClick={onLoadChars}>
                    <div className="inner">load more</div>
                </button>
            }
        </div>
    )
}

export default CharList;