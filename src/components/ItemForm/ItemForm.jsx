import { Field } from 'formik'
import React from 'react'

// styles
import './ItemForm.css';

export const ItemForm = ({item, submittingForm, errors, touched}) => {
  return (
    <>
    {
      item?.name && item?.label ? !item?.options ? item?.type !== "checkbox" ? 
      // Input Component type: text (FullName, Email and BirthDate) 
      <>
        <label className="label__input">{item?.label} </label>
        <Field className={`form__input ${errors[item.name] && touched[item.name] ? 'form__input--error' : ''}`} type={item?.type} name={item?.name} required={item?.required} disabled={submittingForm} />
        {errors[item.name] && touched[item.name] ? (
             <div className='text__input--error'>{errors[item.name]}</div>
           ) : null}
      </> : 
      // Input component type: checkbox (Terms and conditions)
      <>
        <div className='terms__container'>
          <label className="label__input">{item?.label} </label>
          <Field className={`form__input ${errors[item.name] && touched[item.name] ? 'form__input--error' : ''}`} type={item?.type} name={item?.name} required={item?.required} disabled={submittingForm} />
          {errors[item.name] && touched[item.name] ? (
              <div className='text__input--error'>{errors[item.name]}</div>
            ) : null}
        </div>
      </> :
      // Input component type: select (Country of Origin)
      <> 
        <label className="label__input">{item?.label} </label>
        <Field className={`form__input ${errors[item.name] && touched[item.name] ? 'form__input--error' : ''}`} as={item?.type} name={item?.name} required={item?.required} disabled={submittingForm}>
          <option value="">Selecciona tu país</option>
          {
            item?.options.map((option, idx)=><option key={idx} value={option.value}>{option.label}</option>)
          }
        </Field>
        {errors[item.name] && touched[item.name] ? (
             <div className='text__input--error'>{errors[item.name]}</div>
           ) : null}
      </> :
      // Button component type: submit
      <>
        <button className="form__btn" type={item?.type} disabled={submittingForm}>
          {submittingForm ? "Enviando..." : item?.label }
        </button>
      </>
    }
    </>
  )
}