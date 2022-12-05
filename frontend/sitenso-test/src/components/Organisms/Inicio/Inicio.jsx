import React from 'react'
import './Inicio.css'
import PopCorn from '../../Utils/Images/popCorn.png'

export const Inicio = () => {
  return (
    <div className="inicio">
      <h1>MoviePop!</h1>
      <img src={PopCorn} alt="logo" />
    </div>
  )
}
