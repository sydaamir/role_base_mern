import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Admin = () => {
const [usersdata,setUsersData] = useState([]);
let users = [];
const getUsers = () => axios.get('http://localhost:9000/users/')
.then(res => {
    console.log('users are',res);
    users = res.data;
    setUsersData(users);
    
}).catch(err => {
    console.log(err);
}) ;

    
    useEffect(()=>{
         getUsers();
    },[])


    
    return (
        
        
            <div className="components"> 
            <h3 className="top-label">User details :</h3> 
            <table className="admin-table">
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            {
                
            usersdata.map(user => user.role === 'Customer' ?


                    <tr>
                        <td>{user.firstname }</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>
                            <button className="edit-btn">Edit</button>
                        </td>
                    </tr>

                
               
            
            : '' )
                }
                </table> 
        </div>
    )
}
export default Admin;