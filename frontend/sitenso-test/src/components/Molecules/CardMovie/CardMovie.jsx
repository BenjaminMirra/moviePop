import React, { useContext, useEffect, useState } from 'react'
import './CardMovie.css'
import {
    LazyLoadImage
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FavoritosContext } from '../../../context/useContext';

export const CardMovie = ({ title, img }) => {

    const [favorite, setFavorite] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleFavorite = (title) => {
        if (favorite.length > 0) {
            setFavorite(prevData => [...prevData, title])
        } else {
            setFavorite(title);
        }
        console.log(favorite);
    }

    const addToFavorite = (id) => {
        if (!favorite.includes(id)) {
            setFavorite(favorite.concat(id));
            console.log(id)
        }
    }

    const removeFavorite = (id) => {
        let index = favorite.indexOf(id);
        console.log(index);
        let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
        setFavorite(temp);
    }

    return (
        <div className="cardMovie">
            <div className="cardMovie-img">
                <LazyLoadImage effect="blur" width={'100%'} src={img} alt={title} />
            </div>
            <div className="cardMovie-title">
                <h2>{title}</h2>
            </div>
        </div>
    )
}
