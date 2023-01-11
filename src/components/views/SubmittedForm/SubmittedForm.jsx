import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

// components
import { Loader } from '../../Loader/Loader';
// styles
import './SubmittedForm.css';

export const SubmittedForm = () => {

    const [dataForm, setDataForm] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const {idForm} = useParams();

    const getData = async (id) => {
        const querySnapshot = await getDoc(doc(db,"submittedForm",id));
        if (querySnapshot.exists()) {
          setDataForm({id: querySnapshot.id, ...querySnapshot.data()});
          setIsLoading(false);
          setError("");
        } else {
          setIsLoading(false);
          setError("El id proporcionado en la URL no es válido")
        }
    }
    
    useEffect(() => {
      setIsLoading(true);
      getData(idForm);
    }, [idForm]);

    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const convertDateFormat = (str) => {
      return str.split('-').reverse().join('/');
    }

  return (
    <main className="main__container">
      <div className="banner"></div>
      <div className="submitted__container">
          <h1>Formulario enviado</h1>
          <h2>Sus respuestas son: </h2>
          {
              isLoading ? <div className="loader__container"><Loader /></div> : error 
              ? <div className="error__container"><p>{error}</p></div>  
              : <div className="form__container--submitted">
              <h3 className="text__label--submitted">Nombre completo </h3>
              <p className="text__input--submitted">{dataForm?.full_name}</p>
              <h3 className="text__label--submitted">Email </h3>
              <p className="text__input--submitted">{dataForm?.email}</p>
              <h3 className="text__label--submitted">Fecha de nacimiento </h3>
              <p className="text__input--submitted">{convertDateFormat(dataForm?.birth_date)}</p>
              <h3 className="text__label--submitted">País de origen </h3>
              <p className="text__input--submitted">{capitalize(dataForm?.country_of_origin)}</p>
              <div className='terms__container--submitted'>
                <h3 className="text__label--submitted">Términos y condiciones</h3>
                <input className='checkbox__input' type="checkbox" checked={dataForm?.terms_and_conditions} disabled/>
              </div>
          </div>
          }

          <Link className='link__btn' to="/">Volver al formulario</Link>
      </div>
      <div className="banner__mobile"></div>
    </main>
  )
}