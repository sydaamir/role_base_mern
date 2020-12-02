import axios from 'axios';

import Admin from '../components/admin';
import Agent from '../components/agent';
import Customer from '../components/customer';


const url = 'http://localhost:9000/users';
const createUserUrl = 'http://localhost:9000/users/createUser';
const loginUserUrl = 'http://localhost:9000/users/login';

const headers = {
    'Content-Type': 'application/json'
  }
export const getUsers = () => axios.get(url);

let user;
export const createUsers = (newUser) => axios.post(createUserUrl, newUser,{
    headers: headers
}).then(res => {
    console.log(res);
    user = res.data;
    console.log('dataaaa',user.user.role);

    if(user.user.role === 'Admin'){
        console.log('rendered',Admin);
        
        return( 
           { Admin } 
        
        );
    }
    if(user.user.role === 'Agent'){
        return <div>
            <Agent />
        </div>
        
    }
    if(user.user.role === 'Customer'){
        return <div>
            <Customer />
        </div>
    }
}).catch(err => {
    console.log(err);
}) ; 


export const loginUsers = (newUser) => axios.post(loginUserUrl, newUser,{
    headers: headers
}).then(res => {
    console.log(res);
}).catch(err => {
}) ;


