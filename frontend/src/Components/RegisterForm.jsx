import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Loading from "./Loading.jsx";

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setResponseMessage('');
        fetch('http://127.0.0.1:8000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        })
            .then((response) => {
                return response.json();
            })
            .then((info) => {
                if (info.status) {
                    console.log("Registration was successful!");
                    navigate('/login');
                } else {
                    setResponseMessage(info.message)
                    console.log("Registration failed:", info.message);
                }
            })
            .catch((e) => {
                console.log("ERROR:", e.message);
                setResponseMessage(e.message);
            })
            .finally(() => {
                setLoading(false);
            });

        console.log('registering....');
    }

    function setInfo(e) {
        const targetField = e.target.name;

        const setters = {
            username: setUsername,
            email: setEmail,
            password: setPassword,
        };

        if (setters[targetField]) {
            setters[targetField](e.target.value);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="register-username-input">Username</label>
                <input type="text" name={'username'} id={'register-username-input'} required onChange={setInfo}/>
                <br/>
                <label htmlFor="register-email-input">E-mail</label>
                <input type="email" name={'email'} id={'register-email-input'} required onChange={setInfo}/>
                <br/>
                <label htmlFor="register-password-input">Password</label>
                <input type="password" name={'password'} id={'register-password-input'} required onChange={setInfo}/>
                <br/>
                <input type="submit" value="Register"/>
            </form>
            {loading ? <Loading/> : ''}
            <h3 className={'errorText'}>{responseMessage}</h3>
        </div>
    );
}