import React, { useState } from 'react';
import Signup from './components/signup';
import Login from './components/login';
import './components/style.global.css';

    const App = () =>{
    const [userinfo, setUserinfo] = useState({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: ''
        });

    return(
        <div className="container" >
        <Signup className='components_abc' userinfo={userinfo} setUserinfo={setUserinfo}  />
        {/* <Login className='components_abc' loginemail setloginEmail loginpassword setloginPassword /> */}
 
    </div>
    )
  
}
export default App;