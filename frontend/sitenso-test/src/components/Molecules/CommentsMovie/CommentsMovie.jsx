import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './CommentsMovie.css'

const URL_DB = "http://localhost/new/users?select=*&linkTo=id_user&equalTo="

export const CommentsMovie = ({ comment, user_id }) => {

    const [userMail, setUserMail] = useState();

    useEffect(() => {
        axios.get(`${URL_DB}${user_id}`).then((data) => {
            setUserMail(data.data.result[0].email_user);
        })
    }, [user_id])

    return (
        <div className="commentMovie">
            <p>{userMail}:</p>
            <p className="commentMovie-comment">"{comment}"</p>
        </div>
    )
}
