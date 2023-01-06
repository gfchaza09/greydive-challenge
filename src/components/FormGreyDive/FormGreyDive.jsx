import { useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import { ItemForm } from '../ItemForm/ItemForm';

export const FormGreyDive = () => {
  
  const [itemsForm, setItemsForm] = useState([]);

  useEffect(() => {
    fetch('./data/db.json').then(res=>res.json()).then(data=>setItemsForm(data.items));
  }, [])

  const initialValues={
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
    terms_and_conditions: "",
  }

    return (
    <div>
     <h1>Formulario</h1>
     <Formik
       initialValues={initialValues}
       onSubmit={(values, actions) => {
         console.log(values)
       }}
     >
       {props => (
         <Form>
           {
            itemsForm.map((item, idx)=><ItemForm key={idx} item={item}/>)
           }
         </Form>
       )}
     </Formik>
   </div>
  )
}