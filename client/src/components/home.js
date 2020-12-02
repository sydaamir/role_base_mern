import React from 'react';
import '../components/style.global.css';


const Home = () => {
    return(
        <div className="components home-component">

            <h2 className="top-label">Welcome to the Role Base Auth Web App</h2>
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
                <li>If you will register as an Admin or Agent, you will not be able to perform
                 any operation unless approved by any authorized Admin.</li>
                <li>If you will register as a customer you can only request for loan if approved by an agent.</li>
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