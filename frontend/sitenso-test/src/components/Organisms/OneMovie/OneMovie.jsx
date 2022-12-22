import React, { useEffect, useState } from 'react'
import './OneMovie.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CommentsMovie } from '../../Molecules/CommentsMovie/CommentsMovie';
import { Button } from '../../Atoms/Button/Button';
import EmptyStar from '../../Utils/icons/emptyStar.svg'
import Star from '../../Utils/icons/star.svg'

const URL_API = "https://api.tvmaze.com/shows/";
const URL_DB = "https://sitensobe.000webhostapp.com/comments?select=*";
const URL_POST_OPINION = "https://sitensobe.000webhostapp.com/comments";


export const OneMovie = () => {

    const { movie_id } = useParams();
    const [movieData, setMovieData] = useState();
    const [commentData, setCommentData] = useState([]);
    const [message, setMessage] = useState(false);
    let userId;
    if (JSON.parse(localStorage.getItem("userData"))) {
        userId = JSON.parse(localStorage.getItem("userData")).id;
    } else {
        userId = "";
    }
    const [opinionData, setOpinionData] = useState();
    const [alert, setAlert] = useState(false);
    const [stars, setStars] = useState(0);

    const textArea = document.getElementById("textAreaOpinion");

    const handleChangeTextArea = (e) => {
        setOpinionData(e.target.value);
    };

    const handleOpinion = () => {
        if (textArea.value.length < 1) {

        } else {
            if(userId !== ""){
            postOpinion();
            textArea.value = ""
            setAlert(true);
            setMessage("Opinión enviada.")
            }else{
                setAlert(true)
                setMessage("Debes estar logueado para comentar.")
            }
        }

    }

    const postOpinion = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("comment", opinionData);
        urlencoded.append("id_user_comment", userId);
        urlencoded.append("id_movie_comment", movie_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(URL_POST_OPINION, requestOptions)
            .then(response => response.text())
            .catch(error => { return error });
    }

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                setAlert(false);
            }, 2000)
        }
        axios.get(`${URL_API}${movie_id}`,).then((data) => {

            setStars(data.data.rating.average)
            setMovieData(data.data);
        });
        axios.get(`${URL_DB}`).then((data) => {
            setCommentData(data.data.result)
        });

    }, [movie_id, alert]);

    function removeTags(str) {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();

        return str.replace(/(<([^>]+)>)/ig, '');
    }

    return (
        <>
            {movieData ?
                (
                    <>
                        <div className="peliculaContainer">

                            <div className='oneMovie-information'>
                                <h1>{movieData.name}</h1>
                                <div className='oneMovie-genres'>
                                    <h4>
                                        Lenguaje:
                                        <span>{` ${movieData.language}`}</span>
                                    </h4>
                                    <h4>
                                        Géneros:
                                        <span>{`${movieData.genres.map(item => ` ${item}`)}`}</span>
                                    </h4>
                                    <h4>
                                        Fecha de Estreno: <span>{` ${movieData.ended}`}</span>
                                    </h4>
                                </div>
                                <div className="oneMovie-summary">
                                    <h2>Sinópsis</h2>
                                    <p>{removeTags(movieData.summary)}</p>
                                </div>
                            </div>
                            <div className="oneMovie-img">

                                <img className="oneMoviePhoto" src={movieData.image.original} alt={movieData.name} />
                                <div className="oneMovie-stars">
                                    {stars < 1 ? (
                                        ""
                                    ) : stars < 2 ? (
                                        <>
                                            <img src={Star} alt="" />
                                            <img src={EmptyStar} alt="" />
                                            <img src={EmptyStar} alt="" />
                                            <img src={EmptyStar} alt="" />
                                            <img src={EmptyStar} alt="" />
                                        </>
                                    ) : stars <= 4 ? (
                                        <>
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                            <img src={EmptyStar} alt="" />
                                            <img src={EmptyStar} alt="" />
                                            <img src={EmptyStar} alt="" />
                                        </>
                                    ) : stars <= 6 ? (
                                        <>
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                            <img src={EmptyStar} alt="" />
                                            <img src={EmptyStar} alt="" />
                                        </>
                                    ) : stars < 9 ? (
                                        <>
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                            <img src={EmptyStar} alt="" />
                                        </>
                                    ) : stars <= 9.5 ? (
                                        <>
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                            <img src={EmptyStar} alt="" />
                                        </>
                                    ) : (
                                        <>
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                            <img src={Star} alt="" />
                                        </>
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className="oneMovie-comments">
                            <h1>Comentarios</h1>
                            {commentData ? commentData.map((item) => {
                                if (movie_id === item.id_movie_comment.toString()) {
                                    return <CommentsMovie user_id={item.id_user_comment} comment={item.comment} />
                                }
                            }) : "no anda"}
                            <div className="leaveOpinions">
                                <textarea placeholder='Deja aquí tu opinion' name="" id="textAreaOpinion" cols="30" rows="2" onChange={handleChangeTextArea} />
                                <Button label="Enviar" onClick={handleOpinion} />
                            </div>
                            {alert ? 
                            <div className="oneMovieMessage">
                                {message}
                                </div>
                            : ""}
                        </div>
                    </>

                ) : "Hubo un problema, por favor intente mas tarde."}
        </>
    )
}
