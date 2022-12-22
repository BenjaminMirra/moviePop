import React, { useState } from 'react';
import { Input } from '../../Atoms/Input/Input';
import { Button } from '../../Atoms/Button/Button';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const URL_LOGIN = "https://sitensobe.000webhostapp.com/users?register=true&suffix=user";

export const Register = () => {

    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
        rePassword: ""
    })
    const [error, setError] = useState(false);
    const [register, setRegister] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = () => (e) => {
        const { value, name } = e.target;
        setDataForm(prevData => ({ ...prevData, [name]: value }))
    }

    const firstValidation = (event) => {
        if (event === "") {
            return false;
        } else {
            return true;
        }
    }

    const secondValidation = (pass, repass) => {
        if (pass !== repass) {
            return false
        } else {
            return true
        }
    }

    const sendData = async (url, email, password, rePassword) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email_user", `${email}`);
        urlencoded.append("password_user", `${password}`);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        if (!firstValidation(email)) {
            setError(true);
            return setMessage("El correo electrónico no puede estar vacío.")
        } else if (!firstValidation(password)) {
            setError(true);
            return setMessage("La contraseña no puede estar vacía.")
        } else if (!firstValidation(rePassword)) {
            setError(true);
            return setMessage("Por favor, confirme su contraseña.")
        } else if (!secondValidation(password, rePassword)) {
            setError(true);
            return setMessage("Las contraseñas no coinciden.")
        } else {
            return fetch(url, requestOptions)
                .then(response => response.text())
                .then(result => {
                    let aux = JSON.parse(result);
                    if (aux.status !== 200) {
                        setError(true);
                        setMessage("Hubo un error, intente nuevamente.")
                        return null;
                    }
                    if (aux.status === 200) {
                        setError(false);
                        setRegister(true)
                        setMessage("Usuario registrado.")
                        setTimeout(() => {
                            window.location.pathname = "/login";
                        }, [3000])
                    }
                })
                .catch(error => { return error });
        }
    }

    const handleRegister = (e) => {
        e.preventDefault()
        sendData(URL_LOGIN, dataForm.email, dataForm.password, dataForm.rePassword)
    }

    return (
        <div className='register'>
            <div className="register-titles">
                <h1>
                    Crear Cuenta
                </h1>
                <p>¿Ya tienes cuenta?</p>
                <a href="/login"><p>Iniciar Sesión</p></a>
            </div>
            <form>
                <Input type="text" name="email"
                    placeholder="Ingrese su correo electrónico"
                    onChange={handleChange()} />
                <Input type="password" name="password" placeholder="Ingrese su contraseña"
                    onChange={handleChange()} />
                <Input type="password" name="rePassword" placeholder="Confirme su contraseña"
                    onChange={handleChange()} />
                <Button label="Registrarse" onClick={handleRegister} />
            </form>
            <div className="messageContainerRegister">
                {error ?
                    (<div className="registerError">
                        <p>
                            {message}
                        </p>
                    </div>)
                    : register ?
                        (<div className="registerMessage">
                            <p>
                                {message}
                            </p>
                        </div>)
                        : ""}
            </div>
        </div>
    )
}
