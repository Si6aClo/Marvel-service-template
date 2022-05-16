import { Formik, Form, Field, ErrorMessage } from 'formik';
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import './SearchPanel.scss';

const SearchPanel = () => {
    const [name, setName] = useState(null);
    const [charId, setCharId] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    const { getCharacterByName } = useMarvelService();

    return (
        <div className="searchPanel">
            <p className="searchPanel__title">Or find a character by name:</p>
            <Formik
                initialValues={{ char: '' }}
                onSubmit={async (value) => {
                    const res = await getCharacterByName(value.char);
                    setIsSubmit(isSubmit => true);
                    setCharId(res.charId);
                    setName(res.name);
                }}
                validationSchema={Yup.object({
                    char: Yup.string().required('This field is required')
                })}
            >
                <Form className="searchPanel__form">
                    <Field name='char' placeholder="Enter name" />
                    <button type="submit">FIND</button>
                    {!isSubmit ?
                        <ErrorMessage name="char" 
                        render={msg => <div className="searchPanel__generate unsuccess" >{msg}</div>}/>
                        : <SubmitView charId={charId} name={name} />}
                </Form>
            </Formik>
        </div>
    )
}

const SubmitView = ({ charId, name }) => {
    return (
        charId ?
            <>
                <div className="searchPanel__generate success">
                    <p>There is! Visit {name} page?</p>
                    <Link to={'' + charId}>To Page</Link>
                </div>
            </> :
            <>
                <div className="searchPanel__generate unsuccess">
                    <p>The character was not found. Check the name and try again</p>
                </div>
            </>
    )
}

export default SearchPanel;