import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../components/style.global.css';
import Agent from '../components/agent';
import Admin from '../components/admin';
import Customer from '../components/customer';
import userContext from '../context/userContext';
import ErrorNotice from '../components/errorNotice';

const Signup = () =>{
    let {  setUserRegistered} = useContext(userContext);
    const [error, setError] = useState();
    let { registereduser} = useContext(userContext);

    const [userinfo, setUserinfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: '',
        role: ''
    });
    const { role, setRole } = useContext(userContext);


   
        const clearInput = () => {
            setUserinfo({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirm_password: '',
                role:''
              });
        }
        const saveUser = (e) => {
            try{
            e.preventDefault();
            const headers = {
                'Content-Type': 'application/json'
              }
              axios.post('http://localhost:9000/users/createUser', userinfo,{
                headers: headers
            }).then(res => {
                // console.log('users are',res.data);  
                // console.log('users are',res.data[0].id);                
                const user_id = res.data[0].id;
                let users = [];
                const Token = res.data[0].token;
                localStorage.setItem("auth-token", Token);

                axios.get(`http://localhost:9000/users/fetchUser/${user_id}`,
                { headers: { "x-auth-token": Token } })
                .then(res => {
                    // console.log('users are',res);
                    // users = JSON.stringify(res.data);
                    users = res.data[0];
                    // console.log('bd',users);
                    registereduser = ({
                        token: users.token,
                        firstname: users.firstname,
                        lastname: users.lastname,
                        email: users.email,
                        role:users.role,
                        id: users._id

                    });  
                    setRole(registereduser.role);
                    setUserRegistered( registereduser);
                    // console.log('userRegistered....',userregistered);
                    // console.log('role',role);
                    // console.log('state',registereduser); 
                    // console.log('userrrr',registereduser.firstname,registereduser.token);   
                    
                }).catch(err => {
                     console.log(err);
                    err.response.data.msg && setError(err.response.data.msg);

                }) ;
                
            }).catch(err => {
                 console.log(err);
                err.response.data.msg && setError(err.response.data.msg);

            }) ; 
        
            clearInput();
        }
        catch(err)
        {
            err.response.data.msg && setError(err.response.data.msg);
        }
        }
        const updateField = e => {

            setUserinfo({
              ...userinfo,
              [e.target.name]: e.target.value
            });
          };
          useEffect(()=>{
            // console.log('role useEffect',role);

       },[role])
    return(
        
        <>
            {
             role === 'Admin' ? 
             <Admin /> :
             role === 'Agent' ? 
             <Agent /> :
             role === 'Customer' ?
             <Customer /> :
              
            <form className='components signup-component'  onSubmit={saveUser}>
                <div className="top-label">
                    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
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
                    <label className='text-label' htmlFor="confirm_password">Confirm-Password</label>
                </div>
                <div>
                <input
                    className='input-box'
                    id="confirm_password"
                    value={userinfo.confirm_password}
                    onChange={(e) => updateField(e)}
                    placeholder="Confirm-Password"
                    type="password"
                    name="confirm_password"
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
           
            
            }
        </>
        
    )
}
export default Signup;