import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Agent = () => {
const [usersdata,setUsersData] = useState([]);
const [userloan,setUserLoan] = useState({
    tenure:'',
    interest:''
});
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

    const updateField = e => {

        setUserLoan({
          ...userloan,
          [e.target.name]: e.target.value
        });
      };
 
    const saveLoanData = (e) => {
        e.preventDefault();
    }
    
    return (
        
        
            <div className="components agent-component"> 
            <h3 className="top-label">User details :</h3> 
            
            <table className="admin-table">
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    {/* <th>Action</th> */}
                    {/* <th>Tenure</th>
                    <th>Interest</th>
                    <th>Action</th> */}

                </tr>
                {
                
                usersdata.map(user => user.role === 'Customer' ?


                    <tr>
                        <td>{user.firstname }</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        {/* <td>
                            <button className="edit-btn">Edit</button>
                        </td> */}
                        
                        
                        <td>
                        <form onSubmit={saveLoanData} className='form-agent'>
                        
                            <select 
                            value={userloan.tenure} 
                            className='input-box form-agent-child' 
                            name="tenure" id="tenure" 
                            onChange={(e) => updateField(e)}
                            required>
                                
                                <option value="Tenure">Tenure</option>
                                <option value="4-months">4 months</option>
                                <option value="8-months">8 months</option>
                                <option value="12-months">12 months</option>
                            </select>
    
                        
                    
                        
                            <select 
                            value={userloan.intrest} 
                            className='input-box form-agent-child' 
                            name="interest" id="interest" 
                            onChange={(e) => updateField(e)}
                            required>
                                
                                <option value="Interest">Interest</option>
                                <option value="10 percent">10% </option>
                                <option value="20 percent">20%</option>
                                <option value="40 percent">40%</option>
                            </select>

                            <button type="submit" className="form-agent-child">Generate Loan </button>
                            </form>
                        </td>
                       
                        
                    </tr>

: '' )
}
               
            
           
                </table> 
               
        </div>
    )
}
export default Agent;