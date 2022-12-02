import React, { useState } from 'react'
import { Input } from '../../Atoms/Input/Input';
import { Button } from '../../Atoms/Button/Button';
import './Login.css'


const URL_LOGIN = "http://localhost/new/users?login=true&suffix=user";

export const Login = () => {

    const [formValues, setFormValues] = useState({});
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("")

    const handleChange = () => (event) => {
        const { value, name } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const sendData = async (url, email, password) => {

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email_user", email);
        urlencoded.append("password_user", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => {
                let aux = JSON.parse(result);
                if (aux && aux.status !== 200) {
                    setError(true);
                    setMessage("Hubo un error, intente nuevamente")
                    return null;
                }
                if (aux.result[0].token_user) {
                    console.log(aux);
                    localStorage.setItem(
                        "jwt",
                        JSON.stringify(aux.result[0].token_user)
                    );
                    localStorage.setItem(
                        "userData",
                        JSON.stringify({
                            id: aux.result[0].id_user,
                            email: aux.result[0].email_user,
                        })
                    )
                }
                window.location.pathname = "/";

            })
            .catch(error => console.log('error', error));

    }

    const handleLogin = (e) => {
        e.preventDefault()
        sendData(URL_LOGIN, formValues.email, formValues.password)
    }

    return (
        <div className='login'>
            <h1>
                Iniciar Sesión
            </h1>
            <a href="/register"><p>Crear cuenta</p></a>
            <form>
                <Input type="text" name="email"
                    placeholder="Ingrese su correo electrónico"
                    onChange={handleChange()} />
                <Input type="password" name="password" placeholder="Ingrese su contraseña"
                    onChange={handleChange()} />
                <Button label="Iniciar Sesión" onClick={handleLogin} />
            </form>
            <div className="errorContainerLogin">
                {error ? <p>{message}</p> : ""}
            </div>
        </div>
    )
}
