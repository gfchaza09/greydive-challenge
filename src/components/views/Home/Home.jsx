import React from 'react'
// components
import { FormGreyDive } from '../../FormGreyDive/FormGreyDive'

export const Home = () => {
  return (
    <main className='main__container'>
      <div className="banner"></div>
        <FormGreyDive />
      <div className="banner__mobile"></div>
    </main>
  )
}