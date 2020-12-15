import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import LoanModal from '../components/loanModal';
import userContext from '../context/userContext';



const Admin = () => {
const {usersdata,setUsersData} = useContext(userContext);
const {loanusers,setLoanUsers} = useContext(userContext);
const {  setModal } = useContext(userContext);

const [loanCustId, setLoanCustId] = useState('');



let users = [];
const getUsers = () => {
    let Token = localStorage.getItem("auth-token");

    axios.get('http://localhost:9000/users/',
    { headers: { "x-auth-token": Token } })
    .then(res => {
        // console.log('users are',res);
        users = res.data;
        setUsersData(users);
        
    }).catch(err => {
        console.log(err);
    }) ;
}

let loanUserData = [];
const getLoanUsers = () => {
    let Token = localStorage.getItem("auth-token");

    axios.get(`http://localhost:9000/users/getLoanUsers`,
    { headers: { "x-auth-token": Token } })
    .then(res => {
        // console.log('loan users are',res);  
        loanUserData = res.data;
        setLoanUsers(loanUserData);
        // console.log(loanusers);  
    }).catch(err => {
        console.log(err);
    })
    
}

const loanApproval = (customerId) => {
    let Token = localStorage.getItem("auth-token");

    axios.patch(`http://localhost:9000/users/approveLoan/${customerId}`, null,
    { headers: { "x-auth-token": Token } })
    .then(res => {
        // console.log('loan users are',res);  
        loanUserData = res.data;
        setLoanUsers(loanUserData);
        // console.log(loanusers);
        
        alert('Loan has been successfully approved...');  
    }).catch(err => {
        console.log(err);
    })
}
const loanRejection = (customerId) => {
    let Token = localStorage.getItem("auth-token");

    axios.patch(`http://localhost:9000/users/rejectLoan/${customerId}`, null,
    { headers: { "x-auth-token": Token } })
    .then(res => {
        // console.log('loan users are',res);  
        loanUserData = res.data;
        setLoanUsers(loanUserData);
        // console.log(loanusers);  
        alert('Loan has been successfully rejected...');  

    }).catch(err => {
        console.log(err);
    })
}
    const showModal = (userid) => {
        setModal({
            show: true
          });
          setLoanCustId(userid);
        //   console.log('customer loan id',loanCustId);
        //   console.log('modal state',modal)
    }
    useEffect(()=>{
         getUsers();
         getLoanUsers();
    },[loanusers])



    return (
            <div className="components admin-component"> 
            <LoanModal loanCustId = {loanCustId} />
            <h3 className="top-label">User details :</h3> 
            
            <table className="admin-table">
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Approved Loans</th>
                </tr>
            {
            usersdata.map(user => user.role === 'Customer'  
             ? 
             
                    <tr>
                        <td>{user.firstname }</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td style={{textAlign: 'center'}}>
                            <button className="edit-btn" onClick={ () => showModal(user._id) }>View</button>
                        </td>
                         
                    {loanusers.map(loanUser => loanUser.customerId === user._id ? 
                    loanUser.state === 'New'?
                    <>
                        <td><button className="edit-btn" onClick={ () => loanApproval(loanUser.customerId) }>Approve Loan</button></td>
                        <td><button className="edit-btn" onClick={ () => loanRejection(loanUser.customerId) }>Reject Loan</button></td>
                    </>
                    : ''
                    : '')}
                    </tr>
            : '' )
                }
                </table> 
        </div>
    )
}
export default Admin;