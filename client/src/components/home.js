import React from 'react';
import '../components/style.global.css';


const Home = () => {
    return(
        <div className="components home-component">

            <h2 className="top-label">Welcome to the Minimal Loan Web App</h2>
            <div className="home-elements">
            <h3 style={{marginBottom:'2vh'}}>You can choose the role while registering...</h3>
            <div className="role">
            <h4>The roles are:</h4>
            <ul>
                <li>Customer</li>
                <li>Admin</li>
                <li>Agent</li>
            </ul>
            </div>
            <div className="instructions">
            <h2>Note:</h2>
            <ul>
                <li>If you will register as an Admin or Agent, you will  be able to perform the operations
                    like Generate loans for customers, Approve loans for customers and view approved loans of all 
                    customers.</li>
                <li>If you will register as a customer you can see the loan information only about you
                    if generated by an agent and approved by Admin.</li>
            </ul>
            </div>
            <div className="instructions">
            <h2>Instructions:</h2>
            <ul>
                <li>If you are not a registered user click the Register button to register.</li>
                
            </ul>
            </div>
            </div>
        </div>
    )
}
export default Home;