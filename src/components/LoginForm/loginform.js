import React, { useContext } from 'react'
import { Button, FormGroup, Menu, MenuItem } from '@blueprintjs/core';
import useForm from '../../hooks/form';
import { LoginContext } from '../../context/login';


export default function LoginForm() {
    const login = useContext(LoginContext);
    const { handleChange, handleSubmit } = useForm(handleLogin);

    function handleLogin(user) {
        login.login(user.username , user.password)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <h2>LogIn</h2>

                <label>
                    <span>User Name</span>
                    <input onChange={handleChange} name="username" type="text" placeholder="username" />

                </label>

                
                <label>
                    <span>Password</span>
                    <input onChange={handleChange} name="password" type="password" placeholder="password" />

                </label>


              


                <label>
                    <Button type="submit">LogIn</Button>
                </label>
            </form>
        </div>
    )
}



