import React, { useContext } from 'react';
import userContext from '../context/userContext';


 const LoanModal = ({loanCustId }) => {

    const {loanusers} = useContext(userContext);
    const { modal, setModal } = useContext(userContext);
    // console.log('modal prop', loanCustId);
 
    
    const closeModal = () => {
        setModal({
            show: false
          });
        //   console.log('modal state',modal)
    }

  
        
   

    return (
        
            !modal.show ? 
            null:
            <div className="loan-modal">
                
                <div className='modal-header'>
                    <h3 className="top-label">Loan details :</h3> 
                    <button className=" modal-close-btn" onClick={  closeModal }>x</button>
                </div>
                <div className=""> 
           
                <table className="loan-modal-table">
                    <tr>
                        <th>State</th>
                        <th>Amount</th>
                        <th>Emi</th>
                        <th>Interest</th>
                        <th>Tenure</th>
                    </tr>
            
           
                        {
                            loanusers.map(loan => loan.state === 'Approved' && loan.customerId === loanCustId  ? 
                            <tr>
                                <td>{loan.state}</td>
                                <td>{loan.amount}</td>
                                <td>{loan.emi}</td>
                                <td>{loan.interest}</td>
                                <td>{loan.tenure} months</td>
                            </tr>
                        :''
                        )
                        }
            
                
                </table> 
        </div>
            </div>

        
        
    )
}

export default LoanModal
