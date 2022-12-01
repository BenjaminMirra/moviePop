import React from 'react'
import Label from '../../atoms/Label/Label'
import { Input } from '../../atoms/Input/Input'
import './InputLabel.css'

export const InputLabel = ({ className, placeholder, type, label, name, onChange, value }) => {
    return (
        <>
            <div className={className}>
                <Label label={label} />
                <Input name={name} onChange={onChange} value={value} type={type} placeholder={placeholder} />
            </div>

        </>
    )
}

