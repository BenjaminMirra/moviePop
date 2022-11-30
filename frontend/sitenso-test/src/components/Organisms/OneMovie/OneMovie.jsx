import React, { useEffect, useState } from 'react'
import './OneMovie.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const URL_API = "https://api.tvmaze.com/singlesearch/shows?q=";


export const OneMovie = () => {
    const { title } = useParams();

    const [movieData, setMovieData] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`${URL_API}${title}`).then((data) => {
            setMovieData(data.data);
        });
    }, [title]);

    function removeTags(str) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
              
        return str.replace( /(<([^>]+)>)/ig, '');
    }

    return (
        <>
            {movieData ?
                (<div className="oneMovie">
                    <div className="oneMovie-img">
                        <img src={movieData.image.original} alt={movieData.name} />
                    </div>
                    <h1>{movieData.name}</h1>
                    <div className='oneMovie-sections'>
                        <h4>
                            Lenguaje:  
                            <span>{` ${movieData.language}`}</span>
                        </h4>
                        <h4>
                            Géneros: 
                            <span>{`${movieData.genres.map(item=>` ${item}`)}`}</span>
                        </h4>
                        <h4>
                            Fecha de Estreno: <span>{` ${movieData.ended}`}</span>
                        </h4>
                    </div>
                    <div className="oneMovie-summary">
                        <h1>Sinópsis</h1>
                        {removeTags(movieData.summary)}
                    </div>
                </div>
                ) : ""}
        </>
    )
}
