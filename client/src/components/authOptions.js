import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import userContext from '../context/userContext';


const AuthOptions = () => {
    
    const { userData, setUserData } = useContext(userContext);
    const { role, setRole } = useContext(userContext);
    
    let { userregistered,setUserRegistered } = useContext(userContext);
    let { registereduser, setRegisteredUser} = useContext(userContext);

    const history = useHistory();

    const register = () => history.push('/signup');
    const login = () => history.push('/login');
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        setUserRegistered(undefined);
        setRole(undefined);
        setRegisteredUser(undefined);
        localStorage.setItem('auth-token','');
    }
    useEffect(()=>{
        console.log('userregistered useEffect',userregistered);

   },[userregistered])

    return (
        <nav className="auth-options">
            {
                userData.user || userregistered ? (
                <button onClick={logout}>Log out</button>
                ) : (
                    <>
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Login</button>
                    </>
                )
            }


        </nav>
    )
}

export default AuthOptions;
