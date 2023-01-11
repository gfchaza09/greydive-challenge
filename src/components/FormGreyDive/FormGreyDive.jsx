import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import { collection, doc, setDoc } from 'firebase/firestore';

import { db } from '../../config/firebase';

// components
import { ItemForm } from '../ItemForm/ItemForm';
import { Loader } from '../Loader/Loader';

// styles
import './FormGreyDive.css';

export const FormGreyDive = () => {

  const [itemsForm, setItemsForm] = useState([]);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    fetch('./data/db.json').then(res => res.json()).then(data => {
      setItemsForm(data.items);
      setIsLoading(false);
    });
  }, [])

  const initialValues = {
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
    terms_and_conditions: false,
  }

  const validationSchema = Yup.object().shape({
    full_name: Yup.string()
      .min(2, '* Nombre demasiado corto')
      .max(50, '* Nombre demasiado largo')
      .required('* Campo requerido'),
    email: Yup.string()
      .email('* Email inválido')
      .required('* Campo requerido'),
    birth_date: Yup.date()
      .min(new Date('01-01-1900'), '* Ingresa una fecha válida')
      .max(new Date(), '* Ingresa una fecha válida')
      .required('* Campo requerido'),
    country_of_origin: Yup.string()
      .required('* Campo requerido'),
    terms_and_conditions: Yup.boolean()
      .required('* Campo requerido'),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          setSubmittingForm(true);
          const newOrderRef = doc(collection(db, "submittedForm"))
          await setDoc(newOrderRef, values);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Formulario enviado exitosamente',
            text: `¿Desea ver sus respuestas?`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: '#2173fd',
            cancelButtonColor: '#464f65',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/submittedForm/'+ newOrderRef.id);
            }
          })
          if (newOrderRef.id) {
            actions.resetForm();
            setSubmittingForm(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className='form__container'>
            <h1 className='form__container--title'>Formulario</h1>
            <h2 className='form__container--subtitle'>Completa el siguiente formulario</h2>
            {
              isLoading ? <div className="loader__container"><Loader /></div> :
                itemsForm.map((item, idx) => <ItemForm key={idx} item={item} submittingForm={submittingForm} errors={errors} touched={touched} />)
            }
          </Form>
        )}
      </Formik>
    </>
  )
}