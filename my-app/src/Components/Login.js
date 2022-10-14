import React, {useState} from 'react';
import {LOGIN_MUTATION} from '../GraphQL/Mutations';
import {useMutation} from '@apollo/client';
import {useNavigate } from 'react-router-dom';
import Auth from './Auth';
import {onError} from '@apollo/client/link/error';


const Login = () => {
    const [user_mobile, setMobile] = useState("");
    const [user_password, setPassword] = useState("");

    const [Login, {error}] = useMutation(LOGIN_MUTATION);
    let navigate = useNavigate();

    const login = (e) => {
      
        
        Login({
            variables: {
                user_mobile: user_mobile,
                password: user_password
            }
        })

        const hasError = onError(({ graphQLErrors}) => {
            if(graphQLErrors) {
              return true
            }
            else {
              return false
            }
        });

        e.preventDefault()

        if(hasError) {
            Auth.setAuth(true)
            alert("Success")
            navigate("/user")
        }
        else {
            Auth.setAuth(false)
            alert(hasError)
            navigate("/login")
        }

    };

    if(error) {
        console.log(error)
    }

    const toregister = () => {
        navigate('/register')
    }


    return(
        <div className="login-form">
            <form className="login-input" onSubmit={login}>
                <h1>
                    Login
                </h1>
                <input
                type="text"
                placeholder="Mobile"
                pattern='^6\d{9,15}$'
                onChange={(e)=>{
                    setMobile(e.target.value);
                }}
                required
                />
                <input
                type="text"
                placeholder="Password"
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
                required
                />
                <input id='submit-btn' type='submit' value='Login'></input>
                <p onClick={toregister} style={{color:'#6F38C5', cursor:'pointer'}}>
                    Click here to register
                </p>
            </form>
        </div>
    )
}

export default Login;