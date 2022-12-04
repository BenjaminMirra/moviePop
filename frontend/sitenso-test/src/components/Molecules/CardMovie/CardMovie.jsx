import React, { useEffect, useState } from 'react'
import './CardMovie.css'
import {
    LazyLoadComponent,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import NotLikedStar from '../../Utils/icons/bEmptyHeart.svg';
import LikedStar from '../../Utils/icons/favorite.svg';


const URL_API = "http://localhost/new/favorites";
const URL_API_DELETE = "http://localhost/new/favorites?nameId=id_movie_favorite&id="

export const CardMovie = ({ id, title, img, likedMovies }) => {

    const [liked, setLiked] = useState(false);
    const handleFavorite = (movieId) => {
        if (!JSON.parse(localStorage.getItem("userData"))) {
            window.location.pathname = "/login";
        }
        if (!liked) {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            let urlencoded = new URLSearchParams();
            urlencoded.append("id_user_favorite", JSON.parse(localStorage.getItem("userData")).id);
            urlencoded.append("id_movie_favorite", movieId);

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch(URL_API, requestOptions)
                .then((res) => {
                    return setLiked(true);
                })
                .catch((err) => {return err});
        } else {
            let requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            fetch(`${URL_API_DELETE}${id}`, requestOptions)
                .then(res => {
                    return setLiked(false);
                })
                .catch(err => {return err});
        }
    }
    let user_id; 
    if(JSON.parse(localStorage.getItem("userData"))){
        user_id = JSON.parse(localStorage.getItem("userData")).id;
    }

    useEffect(() => {
        if(user_id){
            likedMovies.map((item) => {
                if (item.id_user_favorite === user_id && item.id_movie_favorite === id) {
                    setLiked(true)
                }
            })
        }
        
    }, [likedMovies, user_id, id])

    return (
        <>
        <LazyLoadComponent effect="blur">
        <div className="cardMovie">
            <div className="cardMovie-img">
                <a href={`/movie/${id}`}><img src={img} alt={title} /></a>
                <div className="fav" onClick={() => handleFavorite(id)}>
                    {liked ? <img src={LikedStar} alt="liked" /> : <img alt="notLiked" src={NotLikedStar}/>}
                </div>
            </div>
            <div className="cardMovie-title">
                <h2>{title}</h2>
            </div>
        </div>
        </LazyLoadComponent>
        </>
    )
}
