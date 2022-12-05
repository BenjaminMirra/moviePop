import React, { useEffect, useState } from 'react'
import './Favoritos.css';
import axios from 'axios';
import { CardMovie } from '../../Molecules/CardMovie/CardMovie';
import ImageTest from '../../Utils/Images/imageTest.webp'

const URL_FAV = "http://localhost/new/relations?rel=favorites,users&type=favorite,user&linkTo=id_user&equalTo=";
const URL_API = "https://api.tvmaze.com/shows/";

export const Favoritos = ({ likedMovies }) => {

    const [favoritos, setFavoritos] = useState([]);
    const [logged, isLogged] = useState(false)
    const [message, setMessage] = useState(false);
    let userId = JSON.parse(localStorage.getItem("userData")).id;;

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            isLogged(true);
        } else {
            isLogged(false)
        }
    }, [logged])

    useEffect(() => {
        setMessage(true);
        axios.get(`${URL_FAV}${userId}`).then((data) => {
            data.data.result.map((item) => {
                axios.get(`${URL_API}${item.id_movie_favorite}`).then((data) => {
                    setFavoritos(prevData => {
                        if (!prevData) {
                            return [{
                                name: data.data.name,
                                image: data.data.image.original,
                                id: data.data.id,
                            },
                            ];
                        }
                        else {
                            let bandera = false
                            prevData.forEach(element => {
                                if (element.id === data.data.id) {
                                    return bandera = true;
                                }

                            });
                            if (!bandera) {
                                return [
                                    ...prevData,
                                    {
                                        name: data.data.name,
                                        image: data.data.image.original,
                                        id: data.data.id,
                                    },
                                ];
                            }
                            else {
                                return prevData;
                            }
                        }
                    })
                })
            });
        })
    }, [userId, favoritos, likedMovies])

    return (
        <div className="favoritos">
            <h1>Mis Favoritos</h1>
            {!logged ?
                <div className="notLoginFavoritos">
                    <p>Para poder visualizar tus favoritos debes iniciar sesión.</p>
                </div>
                :
                <div className="favoritos-movies">
                    {
                        favoritos && favoritos.map((movie, idx) => {
                            return (
                                <CardMovie
                                    key={idx}
                                    title={movie.name}
                                    img={movie.image !== null ? movie.image : ImageTest} id={movie.id}
                                    likedMovies={likedMovies}
                                />
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}
