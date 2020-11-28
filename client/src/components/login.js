import React, { useState, useEffect } from 'react';
import '../components/style.global.css';

const Login = ({loginemail, setloginEmail, loginpassword, setloginPassword }) => {
    return(
        <>
            <form className='components'>
                <div style={{textAlign:'center'}}>
                    <label className="top-label" >Sign In </label>
                </div>
                <div>
                    <label className='text-label' htmlFor="email">Email</label>
                </div>
                <div>
                    <input
                            className='input-box'
                            id="email"
                            value={loginemail}
                            onChange={e => setloginEmail(e.target.value)}
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
                            value={loginpassword}
                            onChange={e => setloginPassword(e.target.value)}
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