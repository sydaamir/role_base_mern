import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import Header from './components/header'
import Signup from './components/signup';
import Login from './components/login';
import './components/style.global.css';

    const App = () =>{
    // const [userinfo, setUserinfo] = useState({
    //         firstname: '',
    //         lastname: '',
    //         email: '',
    //         password: '',
    //         role: ''
    //     });

    return(
        
            <BrowserRouter>
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
            </BrowserRouter>
        

    )
  
}
export default App;