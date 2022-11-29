import React, { useState } from 'react'
import { Input } from '../../Atoms/Input/Input';
import { Button } from '../../Atoms/Button/Button';
import './Login.css'

const URL_LOGIN = "http://localhost/loginnew/post.php";

export const Login = () => {

    const [formValues, setFormValues] = useState({});

    const handleChange = () => (event) => {
        const { value, name } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const sendData = async (url, email, password) => {

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
            .then(result => console.log('result', result))
            .catch(error => console.log('error', error));

    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(formValues.email, formValues.password)
        sendData(URL_LOGIN, formValues.email, formValues.password)
    }

    return (
        <div className='login'>
            <form>

                <Input type="text" name="email"
                    placeholder="Ingrese su correo electrónico"
                    onChange={handleChange()} />
                <Input type="password" name="password" placeholder="Ingrese su contraseña"
                    onChange={handleChange()} />
                <Button label="Registrarse" onClick={handleLogin} />
            </form>
        </div>
    )
}
