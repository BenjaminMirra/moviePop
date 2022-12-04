import React from 'react'
import './Inicio.css'
import PopCorn from '../../Utils/Images/popCorn.png'

export const Inicio = () => {
  return (
    <div className="inicio">

        <img src={PopCorn} alt="logo" />
        <h1>MoviePop!</h1>

    </div>
  )
}
