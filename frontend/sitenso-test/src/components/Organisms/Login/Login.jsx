import React, { useState } from 'react'
import { Input } from '../../Atoms/Input/Input';
import { Button } from '../../Atoms/Button/Button';
import { useNavigate } from "react-router-dom";
import './Login.css'

const URL_LOGIN = "http://localhost/loginnew/post.php";

export const Login = () => {

    const [formValues, setFormValues] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = () => (event) => {
        const { value, name } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const sendData = async (url, email, password) => {

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);

        var requestOptions = {
            method: 'GET',
            //body: formdata,
            redirect: 'follow'
        };
        console.log("email:" + email);
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => {
                JSON.parse(result).map((item) => {
                    if (item.email === email && item.password === password) {
                        navigate("/")
                    } else {
                        setMessage("El email o la contraseña no coinciden")
                    }
                }

                )
            })
            .catch(error => console.log('error', error));

    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(formValues.email, formValues.password)
        sendData(URL_LOGIN, formValues.email, formValues.password)
    }

    return (
        <div className='login'>
            <h1>
                Iniciar Sesión
            </h1>
            <form>
                <Input type="text" name="email"
                    placeholder="Ingrese su correo electrónico"
                    onChange={handleChange()} />
                <Input type="password" name="password" placeholder="Ingrese su contraseña"
                    onChange={handleChange()} />
                <Button label="Registrarse" onClick={handleLogin} />
            </form>
            {message !== "" ? message : ""}
        </div>
    )
}
