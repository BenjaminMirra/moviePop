import React from 'react'
import './Input.css'

export const  Input = ({placeholder,className,value,onChange,name,type}) => {

    return (<>
                <input type={type} autoComplete='off' name={name} id={name} value={value} onChange={onChange} className={className} placeholder={placeholder} />
    </>
    )
}


