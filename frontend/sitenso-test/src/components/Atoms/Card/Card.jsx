import React from 'react'
import { getSize } from './helpers'
import './Card.css'

const Card = ({width,height,children, className}) => {
    return (
        <div className={className} style={{width:getSize(width),height:getSize(height)}}>
            {children}
        </div>
    )
}

export default Card;