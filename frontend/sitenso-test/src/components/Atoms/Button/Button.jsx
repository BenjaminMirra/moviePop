import React from 'react'
import './Button.css'

    
export const Button = ({id, onClick, className, label}) => {
    
  return (
      <>
      <button id={id} onClick={onClick} className={className} >{label}</button>
    </>
  )
}



