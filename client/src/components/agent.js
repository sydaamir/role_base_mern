import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import userContext from '../context/userContext';
import LoanModal from '../components/loanModal';
import ErrorNotice from '../components/errorNotice';



const Agent = () => {
const { modal, setModal } = useContext(userContext);
const [loanCustId, setLoanCustId] = useState('');
const [error, setError] = useState();


const [usersdata,setUsersData] = useState([]);
const [userloan,setUserLoan] = useState({
    tenure:'',
    interest:'',
    customerId: ''
});
let [loanusers,setLoanUsers] = useState([]);


let users = [];
const getUsers = () => {
    let Token = localStorage.getItem("auth-token");
    
    axios.get('http://localhost:9000/users/',
    { headers: { "x-auth-token": Token } })
    .then(res => {
        console.log('users are',res);
        users = res.data;
        setUsersData(users);
        
    }).catch(err => {
        console.log(err);
        err.response.data.msg && setError(err.response.data.msg);

    }) ;
}


let loanUserData = [];
const getLoanUsers = () => {
    let Token = localStorage.getItem("auth-token");

    axios.get(`http://localhost:9000/users/getLoanUsers`,
    { headers: { "x-auth-token": Token } })
    .then(res => {
        console.log('loan users are',res);  
        loanUserData = JSON.stringify(res.data);
        loanusers = loanUserData;
        console.log('uuuuuuuuuu',loanusers); 

    }).catch(err => {
        console.log(err);
        err.response.data.msg && setError(err.response.data.msg);

    })
}

const showModal = (userid) => {
    setModal({
        show: true
      });
      setLoanCustId(userid);
      console.log('customer loan id',loanCustId);
      console.log('modal state',modal)
}

    useEffect(()=>{
         getUsers();
         getLoanUsers()
    },[loanusers])

    const clearInput = () => {
        setUserLoan({
            tenure: '',
            interest: '',
            customerId: ''
          });
    }

    const updateField = e => {
        console.log(e.target.name)
        console.log(e.target.value)

        setUserLoan({
            
          ...userloan,
          [e.target.name]: e.target.value
        });
      };
 
    const saveLoanData = (e) => {
        e.preventDefault();
        console.log(userloan)
        let Token = localStorage.getItem("auth-token");

        axios.post('http://localhost:9000/users/generateLoan', userloan,
        { headers: { "x-auth-token": Token } })
        .then(res => {
            console.log('users are',res);  
            console.log('users are',res.data);
            console.log(res.message);
            alert('Loan has been successfully generated...'); 

        }).catch(err => {
            console.log(err);
            err.response.data.msg && setError(err.response.data.msg);

        }) ;

        clearInput();
    }
    return (
        
        
            <div className="components agent-component"> 
            <LoanModal loanCustId = {loanCustId} />
            <div className="top-label">
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            
            <span >User details :</span> 

            </div>
            
            <table className="admin-table">
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Approved Loans</th>
                    {/* <th>Action</th> */}
                    {/* <th>Tenure</th>
                    <th>Interest</th>
                    <th>Action</th> */}

                </tr>
                {
                
                usersdata.map((user,index) => user.role === 'Customer' ?

                    <tr>

                        <td>{user.firstname }</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td style={{textAlign: 'center'}}>
                            <button className="edit-btn" onClick={ () => showModal(user._id) }>View</button>
                        </td>
                      

                            
                            <td>
                            <form onSubmit={saveLoanData} className='form-agent'>
                            
                                <select 
                                value={userloan.tenure} 
                                className='input-box form-agent-child' 
                                name="tenure" id="tenure" 
                                onChange={(e) => {
                                setUserLoan({...userloan,[userloan.customerId]: user._id});
                                userloan.customerId = user._id;
                                 updateField(e)}}
                                required>
                                    
                                    <option value="Tenure">Tenure</option>
                                    <option value="4-months">4 months</option>
                                    <option value="8-months">8 months</option>
                                    <option value="12-months">12 months</option>
                                </select>
        
                            
                                <select 
                                value={userloan.interest} 
                                className='input-box form-agent-child' 
                                name="interest" id="interest" 
                                onChange={(e) => updateField(e)}
                                required>
                                    
                                    <option value="Interest">Interest</option>
                                    <option value="10">10% </option>
                                    <option value="20">20%</option>
                                    <option value="40">40%</option>
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