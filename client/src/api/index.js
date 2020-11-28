import axios from 'axios';

const url = 'http://localhost:9000/users';
const createUserUrl = 'http://localhost:9000/users/createUser';

const headers = {
    'Content-Type': 'application/json'
  }
export const getUsers = () => axios.get(url);
export const createUsers = (newUser) => axios.post(createUserUrl, newUser,{
    headers: headers
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
}) ; 
