import React from 'react'
import './Input.css'

export const  Input = ({placeholder,className,value,onChange,name}) => {

    return (<>
                <input autoComplete='off' name={name} id={name} value={value} onChange={onChange} className={className} placeholder={placeholder} />
    </>
    )
}


