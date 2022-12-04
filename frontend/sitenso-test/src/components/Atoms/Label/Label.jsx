import React from 'react'
import './Label.css'

const Label = ({ id, label, className }) => {

  return (
    <label className={className} htmlFor={id}>{label}</label>
  )
}

export default Label