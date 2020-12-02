import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import Home from './components/home';
import Header from './components/header'
import Signup from './components/signup';
import Login from './components/login';
import './components/style.global.css';
import userContext from './context/userContext';


    const App = () =>{
    // const [userinfo, setUserinfo] = useState({
    //         firstname: '',
    //         lastname: '',
    //         email: '',
    //         password: '',
    //         role: ''
    //     });
        const [userData, setUserData] = useState({
            token: undefined,
            user: undefined
        });

        useEffect(() => {
            const checkLoggedIn = async () => {
                let token = localStorage.getItem("auth-token");
                if(token === null){
                    localStorage.setItem("auth-token","");
                    token= "";
                }
                const tokenRes = await Axios.post('http://localhost:9000/users/tokenIsValid',
                null,
                {    headers: { "x-auth-token":token } }
                );
                if(tokenRes.data){
                    const userRes = await Axios.get('http://localhost:9000/users/user',
                    { headers: { "x-auth-token": token } }
                    );
                    setUserData({
                        token,
                        user: userRes.data,
                    })
                }
            }
            checkLoggedIn();

        },[])
    return(
        
            <BrowserRouter>
            <userContext.Provider value={{userData, setUserData}}>
            <Header />
            <Switch>
            <div className="container" >
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </div>
            </Switch>
                {/* <Signup className='components_abc' userinfo={userinfo} setUserinfo={setUserinfo}  /> */}
                {/* <Login className='components_abc' loginemail setloginEmail loginpassword setloginPassword /> */}
            </userContext.Provider>
            </BrowserRouter>
        

    )
  
}
export default App;