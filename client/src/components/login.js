import React, { useState } from 'react';
import '../components/style.global.css';
import { loginUsers } from '../api/index';

const Login = () => {
    
    const [userlogin, setUserlogin] = useState({
        email: '',
        password: ''
    });

   
        const clearInput = () => {
            setUserlogin({

                email: '',
                password: ''
              });
        }
        const loginUser = (e) => {
            e.preventDefault();
            loginUsers(userlogin);
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
        </>
    )
}
export default Login;