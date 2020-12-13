import React, { useContext, useEffect, useState } from 'react';
import userContext from '../context/userContext';
import axios from 'axios';


const Customer = () => {
const {loanusers,setLoanUsers} = useContext(userContext);
let { loggedInUser, setLoggedInUser} = useContext(userContext);
let { userregistered, setUserRegistered} = useContext(userContext);
const [userInfo, setUserInfo] = useState({
    firstname: undefined,
    id: undefined
})



let loanUserData = [];
const getLoanUsers = () => {
    let Token = localStorage.getItem("auth-token");

    axios.get(`http://localhost:9000/users/getLoanUsers`,
    { headers: { "x-auth-token": Token } })
    .then(res => {
        console.log('loan users are',res);  
        loanUserData = res.data;
        setLoanUsers(loanUserData);
        console.log(loanusers);  
    }).catch(err => {
        console.log(err);
    })
    
}

useEffect(()=>{
    getLoanUsers();
    if(loggedInUser) {
        setUserInfo({
            firstname: loggedInUser.firstname,
            id: loggedInUser.id
        });

    }
    if(userregistered) {
        setUserInfo({
            firstname: userregistered.firstname,
            id: userregistered.id
        });
    
        }
    
},[loggedInUser, userregistered])



    return (
        <div className="components admin-component"> 
            <h3 className="top-label">Welcome 
                <span 
                    style={{ fontSize: '2rem',
                    color: '#7c0b0b',
                    fontWeight: 'bold',
                    fontStyle: 'italic', 
                    marginLeft: '1rem' }}>

                        { userInfo.firstname }
                </span>
             </h3> 
            
            <table className="admin-table">
                <tr>
                    <th>State</th>
                    <th>Emi</th>
                    <th>Interest</th>
                    <th>Tenure</th>
                </tr>
            {
                
            loanusers.map(user => user.customerId === userInfo.id && user.state === 'Approved' ? 
                    <tr>
                    
                        <td>{user.state}</td>
                        <td>{user.emi}</td>
                        <td>{user.interest}</td>
                        <td>{user.tenure}</td>
                    </tr>
            : 
            ''
            )
                }
                </table> 
        </div>
    )
}
export default Customer;