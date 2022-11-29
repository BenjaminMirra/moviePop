import React, { useState } from 'react';
import { Input } from '../../Atoms/Input/Input';
import { Button } from '../../Atoms/Button/Button';
import './Register';

const URL_LOGIN = "http://localhost/loginnew/post.php";

export const Register = () => {

    const [formValues, setFormValues] = useState({});
    const [message, setMessage] = useState("");

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

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => console.log('result', result))
            .catch(error => console.log('error', error));

    }

    const handleRegister = (e) => {
        e.preventDefault()
        const data = formValues;
        console.log(data)
        sendData(URL_LOGIN, data.email, data.password)
    }

    return (
        <div className='register'>
            <form>
                <Input type="text" name="email"
                    placeholder="Ingrese su correo electrónico"
                    onChange={handleChange} />
                <Input type="password" name="password" placeholder="Ingrese su contraseña"
                    onChange={handleChange} />
                <Input type="password" name="re-password" placeholder="Confirme su contraseña" />
                <Button label="Registrarse" onClick={handleRegister} />
            </form>
        </div>
    )
}
