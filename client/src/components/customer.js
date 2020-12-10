import React, { useContext, useEffect } from 'react';
import userContext from '../context/userContext';
import axios from 'axios';


const Customer = () => {
const {loanusers,setLoanUsers} = useContext(userContext);
let { loggedInUser, setLoggedInUser} = useContext(userContext);

let fieldsFlag = true;

let loanUserData = [];
const getLoanUsers = () => {
    axios.get(`http://localhost:9000/users/getLoanUsers`)
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
},[loanusers])

    return (
        <div className="components admin-component"> 
            <h3 className="top-label">Welcome 
                <span 
                    style={{ fontSize: '2rem',
                    color: '#7c0b0b',
                    fontWeight: 'bold',
                    fontStyle: 'italic', 
                    marginLeft: '1rem' }}>

                        { loggedInUser.firstname }
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
                
            loanusers.map(user => user.customerId === loggedInUser.id && user.state === 'Approved' ? 
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