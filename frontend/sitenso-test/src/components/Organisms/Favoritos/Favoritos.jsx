import React, { useContext } from 'react'
import FavoritosContextProvider from '../../../context/useContext';

export const Favoritos = () => {

    const { favoritos } = useContext(FavoritosContextProvider);


    return (
        <div>Favoritos</div>
    )
}
