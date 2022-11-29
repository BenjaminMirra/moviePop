import React from 'react'
import './CardMovie.css'
import {
    LazyLoadImage
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const CardMovie = ({ title, img }) => {
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
