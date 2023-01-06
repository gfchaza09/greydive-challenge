import { Field } from 'formik'
import React from 'react'

export const ItemForm = ({item}) => {
  return (
    <>
    {
      item?.name && item?.label ? !item?.options ? <>
        <label>{item?.label}: </label>
        <Field type={item?.type} name={item?.name} required={item?.required} />
      </> : <> 
        <label>{item?.label}: </label>
        <Field as={item?.type} name={item?.name} required={item?.required}>
          <option value="">Selecciona tu país</option>
          {
            item?.options.map((option, idx)=><option key={idx} value={option.value}>{option.label}</option>)
          }
        </Field>
      </>
      : <>
        <button type={item?.type}>
          {item?.label}
        </button>
      </>
    }
    </>
  )
}