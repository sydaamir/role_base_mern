import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Admin = () => {
const [usersdata,setUsersData] = useState([]);
const [loanusers,setLoanUsers] = useState([]);


let users = [];
const getUsers = () => axios.get('http://localhost:9000/users/')
.then(res => {
    console.log('users are',res);
    users = res.data;
    setUsersData(users);
    
}).catch(err => {
    console.log(err);
}) ;

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

const loanApproval = (customerId) => {
    axios.patch(`http://localhost:9000/users/approveLoan/${customerId}`)
    .then(res => {
        console.log('loan users are',res);  
        loanUserData = res.data;
        setLoanUsers(loanUserData);
        console.log(loanusers);  
    }).catch(err => {
        console.log(err);
    })
}
const loanRejection = (customerId) => {
    axios.patch(`http://localhost:9000/users/rejectLoan/${customerId}`)
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
         getUsers();
         getLoanUsers();
    },[])



    return (
            <div className="components admin-component"> 
            <h3 className="top-label">User details :</h3> 
            <table className="admin-table">
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            {
            usersdata.map(user => user.role === 'Customer'  
             ? 
             
                    <tr>
                        <td>{user.firstname }</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>
                            <button className="edit-btn">Edit</button>
                        </td>
                         
                    {loanusers.map(loanUser => loanUser.customerId === user._id ? 
                    loanUser.state === 'New'?
                    <>
                        <td><button className="edit-btn" onClick={ () => loanApproval(loanUser.customerId) }>Approve Loan</button></td>
                        <td><button className="edit-btn" onClick={ () => loanRejection(loanUser.customerId) }>Reject Loan</button></td>
                    </>
                    : loanUser.state === 'Approved' ? 
                        <td> Loan Approved </td> :
                        <td>Loan Rejected</td>
                    : '')}
                    </tr>
            : '' )
                }
                </table> 
        </div>
    )
}
export default Admin;