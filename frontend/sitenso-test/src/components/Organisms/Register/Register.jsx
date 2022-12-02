import React, { useState } from 'react';
import { Input } from '../../Atoms/Input/Input';
import { Button } from '../../Atoms/Button/Button';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const URL_LOGIN = "http://localhost/new/users?register=true&suffix=user";

export const Register = () => {

    const [formValues, setFormValues] = useState({});
    const [dataForm, setDataForm] = useState({
        email: " ",
        password: " ",
        rePassword: " "
    })
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error])

    const handleChange = () => (e) => {
        const { value, name } = e.target;
        setDataForm(prevData => ({ ...prevData, [name]: value }))
    }

    const firstValidation = (data) => {
        if (data.email === " ") {
            return true
        } else if (data.password === " ") {
            return null
        } else if (data.rePassword !== " " && data.rePassword !== data.password) {
            return 0;
        } else {
            return false
        }
    }

    const sendData = async (url, email, password) => {
        setError(false)
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
        if (firstValidation(dataForm)) {
            setError(true);
            setMessage("El corre electrónico no puede estar vacío")
        } else if (firstValidation(dataForm) === null) {
            setError(true);
            setMessage("La contraseña no puede estar vacía")
        } else if (firstValidation(dataForm) === 0) {
            setError(true);
            setMessage("Las contraseñas no coinciden")
        } else {
            fetch(url, requestOptions)
                .then(response => response.text())
                .then(result => {
                    let aux = JSON.parse(result);
                    if (aux.status !== 200) {
                        setError(true);
                        setMessage("Hubo un error, intente nuevamente")
                        return null;
                    }
                    if (aux.status === 200) {
                        setError(true)
                        setMessage("Registro realizado.")
                        setTimeout(() => {
                            window.location.pathname = "/login";
                        }, [3000])
                    }
                })
                .catch(error => console.log( error));
        }


    }

    const handleRegister = (e) => {
        e.preventDefault()
        sendData(URL_LOGIN, dataForm.email, dataForm.password)

    }
    return (
        <div className='register'>
            <h1>
                Crear Cuenta
            </h1>
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
            <div className="errorContainerRegister">
                {error ? <p>{message}</p> : ""}
            </div>
        </div>
    )
}
