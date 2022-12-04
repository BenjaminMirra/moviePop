import React from 'react';

import './Paragraph.css'

export const Paragraph = ({ children, onClick, className }) => {

  return (
    <>
      <p onClick={onClick} className={className} >{children}</p>
    </>
  )
}