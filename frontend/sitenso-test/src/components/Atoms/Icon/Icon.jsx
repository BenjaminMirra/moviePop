import React from 'react'
import './Icon.css'

export const Icon = ({ icon, id, className }) => {

    return (
        <div className='i-icon' style={{ display: 'flex' }} >
            <img id={id} className={className} src={icon} alt={icon} />
        </div>
    )
}