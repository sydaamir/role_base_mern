import React, { useState, useEffect } from 'react';
import { createUsers } from '../api/index';
import '../components/style.global.css';

//const [firstName, setFirstName] = useState(null);
const Signup = () =>{

    const [userinfo, setUserinfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: ''
    });

   
        const clearInput = () => {
            setUserinfo({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                role:''
              });
        }
        const saveUser = (e) => {
            e.preventDefault();
            createUsers(userinfo);
            clearInput();
        }
        const updateField = e => {

            setUserinfo({
              ...userinfo,
              [e.target.name]: e.target.value
            });
          };

          
    
    return(
        <>
            
            <form className='components'  onSubmit={saveUser}>
                <div className="top-label">
                    <span > Register </span>
                </div>  
                    <div>
                    <label className='text-label' htmlFor="firstname">First Name</label>
                    </div>
                    <div>
                     <input
                        className='input-box'
                        id="firstname"
                        value={userinfo.firstname}
                        // onChange={e => setUserinfo({...userinfo, userinfo.firstname: e.target.value})}
                        onChange={(e) => updateField(e)}
                        placeholder="First name"
                        type="text"
                        name="firstname"
                        required
                />
                </div>
                
                    <div>
                        <label className='text-label' htmlFor="lastname">Last Name</label>
                    </div>
                <div>   
                <input
                    className='input-box'
                    id="lastname"
                    value={userinfo.lastname}
                    onChange={(e) => updateField(e)}
                    placeholder="Last name"
                    type="text"
                    name="lastname"
                    required
                />
                </div>
                <div>
                    <label className='text-label' htmlFor="email">Email</label>
                </div>
                <div>
                <input
                    className='input-box'
                    id="email"
                    value={userinfo.email}
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
                    value={userinfo.password}
                    onChange={(e) => updateField(e)}
                    placeholder="Password"
                    type="password"
                    name="password"
                    required
                />
                </div>
                <div>
                    <label className='text-label' htmlFor="role">Role</label>
                </div>
                <div>
                    <select 
                    value={userinfo.role} 
                    className='input-box' 
                    name="role" id="role" 
                    onChange={(e) => updateField(e)}
                    required>
                        
                        <option value="Select">Select</option>
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                        <option value="Agent">Agent</option>
                    </select>
                </div>
                <div style={{textAlign:'center'}}>
                <button type="submit" className="btn-submit">Sign Up</button>
                </div>
            </form>
        </>
    )
}
export default Signup;