import React from 'react'
import { useRef } from 'react';

const URL_LOGIN = "http://localhost/loginnew/post.php";

const sendData = async (url,email,password) => {

    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export const Login = () => {

    const refUsuario = useRef(null);
    const refClave = useRef(null);

    const handleLogin = (e) => {
        e.preventDefault()
        const data = {
            'email': refUsuario.current.value,
            'password': refClave.current.value
        }
        console.log(data)
        sendData(URL_LOGIN,data.email,data.password)
    }

    return (
        <div>
            <form>

                <input type="text" name="email" placeholder="Ingrese su email"
                    ref={refUsuario} />
                <input type="password" name="password" placeholder="Ingrese su contraseña"
                    ref={refClave} />
                <input type="submit" value="Send" onClick={handleLogin} />
            </form>


        </div>
    )
}
