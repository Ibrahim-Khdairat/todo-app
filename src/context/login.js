import React, { useEffect, useState } from "react";
import superagent from "superagent";
import base64 from 'base-64';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { setList } from "../components/todo/todo";
export const LoginContext = React.createContext();
const API = 'https://auth-server-401.herokuapp.com/signin';// .env

export default function LoginProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    // initial render
    useEffect(() => {
        const qs = new URLSearchParams(window.location.search);
        const cookieToken = cookie.load('auth');
        const token = qs.get('token') || cookieToken || null;
        validateJwToken(token);
    }, []);
    
    const login = async (username, password) => {
        // {username: password} encoded
        //Basic base64(username:password)
        
        const encodedUsernameAndPassword =
            base64.encode(`${username}:${password.toUpperCase()}`);
            
        const response = await superagent.post(`${API}`)
            .set('authorization', `Basic ${encodedUsernameAndPassword}`)
            .set('Access-Control-Allow-Origin', '*');
            validateJwToken(response.body.token);

            let data = localStorage.getItem('logout');
            let listData = JSON.parse(data);

     


    }

    const validateJwToken = (token) => {
        if (token) {
            // the user is logged in
            const user = jwt.decode(token);
            setLoginState(true, user);


            cookie.save('token', token)
        } else {
            // the user is NOT logged in
            setLoginState(false, {});
        }
    }
    
    const setLoginState = (loggedIn, user) => {
        setLoggedIn(loggedIn);
        setUser(user);
    }

    const logout = () => {
        setLoginState(false, {});
        cookie.remove('token');

        let data = localStorage.getItem('list');
        let listData = JSON.parse(data);
        let parsedData = JSON.stringify(listData);
        localStorage.setItem('logout' , parsedData);
    }

    const can = (capability) => {
        return user?.capabilities?.includes(capability);
    };
    
    const state = {
        loggedIn,
        login,
        logout,
        user,
        can
    }

    return (
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    )
}



    // import React, { useEffect } from 'react';
    // import cookie from 'react-cookies';
    // import jwt from 'jsonwebtoken';
    
    // const testUsers = {
    //     admin: { password: 'password', name: 'Administrator', role: 'admin', capabilities: ['create', 'read', 'update', 'delete'] },
    //     editor: { password: 'password', name: 'Editor', role: 'editor', capabilities: ['read', 'update'] },
    //     writer: { password: 'password', name: 'Writer', role: 'writer', capabilities: ['create'] },
    // };
    
    // export const LoginContext = React.createContext();
    
    // export default function LoginProvider(props) {
    
    
    
    //     const state = {
    //         loggedIn: false,
    //         can: can,
    //         login: login,
    //         logout: logout,
    //         user: { capabilities: [] },
    //     };
    
    
    //     can = (capability) => {
    //         return state?.user?.capabilities?.includes(capability);
    //     }
    
    //     login = (username, password) => {
    //         if (testUsers[username]) {
    //             // Create a "good" token, like you'd get from a server
    //             const token = jwt.sign(testUsers[username], process.env.REACT_APP_SECRET);
    //             validateToken(token);
    //         }
    //     }
    
    //     logout = () => {
    //         setLoginState(false, null, {});
    //     };
    
    //     validateToken = token => {
    //         try {
    //             let user = jwt.verify(token, process.env.REACT_APP_SECRET);
    //             setLoginState(true, token, user);
    //         }
    //         catch (e) {
    //             setLoginState(false, null, {});
    //             console.log('Token Validation Error', e);
    //         }
    
    //     };
    
    //     setLoginState = (loggedIn, token, user) => {
    //         cookie.save('auth', token);
    //         setState({ token, loggedIn, user });
    //     };
    
    
    //     useEffect(() => {
    
    //     }, []);
    
    
    //     return (
    //         <LoginContext.Provider value={state}>
    //             {props.children}
    //         </LoginContext.Provider>
    //     );
    // }