import React, { useState, useContext, useEffect } from 'react';
import '../components/style.global.css';
import { loginUsers } from '../api/index';
import Axios from 'axios';
import userContext from '../context/userContext';

import Agent from '../components/agent';
import Admin from '../components/admin';
import Customer from '../components/customer';


const Login = () => {
    
    const [userlogin, setUserlogin] = useState({
        email: '',
        password: ''
    });
    let { loggedInUser, setLoggedInUser} = useContext(userContext);
    const { role, setRole } = useContext(userContext);

   
        const clearInput = () => {
            setUserlogin({

                email: '',
                password: ''
              });
        }
        const loginUser = (e) => {
            e.preventDefault();
            loginUsers(userlogin);
            Axios.post('http://localhost:9000/users/login', userlogin)
            .then(res => {
                console.log('login user is',res.data[0]);
                const loginUser = res.data[0];  
                setLoggedInUser ({
                    token: loginUser.token,
                    firstname: loginUser.firstname,
                    lastname: loginUser.lastname,
                    email: loginUser.email,
                    role:loginUser.role,
                    id: loginUser.id

                });
                setRole(loginUser.role);

                console.log('logged in user',loggedInUser);
            }).catch(err => {
                    console.log(err);
            }) ;
            clearInput();
        }
        const updateField = e => {

            setUserlogin({
              ...userlogin,
              [e.target.name]: e.target.value
            });
          };
          
    return(
        <>
        {
            role === 'Admin' ? 
             <Admin /> :
            role === 'Agent' ? 
             <Agent /> :
            role === 'Customer' ?
             <Customer /> :
            <form className='components ' onSubmit={loginUser}>
                <div className="top-label">
                    <label  >Sign In </label>
                </div>
                <div>
                    <label className='text-label' htmlFor="email">Email</label>
                </div>
                <div>
                    <input
                            className='input-box'
                            id="email"
                            value={userlogin.email}
                            onChange={(e) => updateField(e)}
                            placeholder="Email address"
                            type="email"
                            name="email"
                            required
                        />
                    </div>
                    <div>
                        <label className='text-label' htmlFor="password">Password</label>
                    </div>
                    <div>
                        <input
                            className='input-box'
                            id="password"
                            value={userlogin.password}
                            onChange={(e) => updateField(e)}
                            placeholder="Password"
                            type="password"
                            name="password"
                            required
                        />
                    </div>
                    <div style={{textAlign:'center'}}>
                        <button type="submit" className="btn-submit">Login</button>
                        
                </div>
            </form>
}
        </>

    )
}
export default Login;