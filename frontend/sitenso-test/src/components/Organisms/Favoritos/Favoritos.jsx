import React, { useEffect, useState } from 'react'
import './Favoritos.css';

export const Favoritos = () => {

    const [logged, isLogged] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            isLogged(true);
        } else {
            isLogged(false)
        }
    }, [logged])

    return (
        <div className="favoritos">
            {!logged ?
                <div className="notLoginFavoritos">
                    <p>Para poder visualizar tus favoritos debes iniciar sesión.</p>
                </div>
                :
                <div>
                    <p>Favoritos</p>
                </div>
            }
        </div>
    )
}
