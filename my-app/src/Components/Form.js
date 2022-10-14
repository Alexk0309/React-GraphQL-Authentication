import React, {useState} from 'react';
import { REGISTER_MUTATION } from '../GraphQL/Mutations';
import {useMutation} from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [user_fullname, setFullname] = useState("");
    const [user_email, setEmail] = useState("");
    const [user_mobile, setMobile] = useState("");
    const [user_password, setPassword] = useState("");
    let navigate = useNavigate();
    const [Register, {error}] = useMutation(REGISTER_MUTATION);

    const register = (e) => {
        e.preventDefault()
        Register({
            variables: {
                user_fullname: user_fullname,
                user_email: user_email,
                user_mobile: user_mobile,
                password: user_password
            }
        })

        alert('Successfully Register!')
        navigate('/login')
    };

    if(error) {
        console.log(error)
    }

    const toLogin = () => {
        navigate('/login');
    }

    return(
        <div className="register-form">
            <form className='register-input' onSubmit={register}>
                <h1>
                    Register
                </h1>
                <input
                type="text"
                placeholder="Full name"
                pattern='^[a-zA-Z]+$'
                onChange={(e)=>{
                    setFullname(e.target.value);
                }}
                required
                />
                <input
                type="text"
                placeholder="Email"
                pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}
                required
                />
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
                pattern='^.{9}$'
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
                required
                />
                <input id='submit-btn' type='submit' value='Register'></input>
                <p onClick={toLogin} style={{color:'#6F38C5', cursor:'pointer'}}>
                    Click if you already have an account
                </p>
            </form>
        </div>
    )
}

export default Form;