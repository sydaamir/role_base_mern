import React from 'react';
import { Link } from 'react-router-dom';

import AuthOptions from './authOptions'

const Header = () => {
    return (
        <div>
            <Link to="/"><h1>Role Base MERN Auth</h1></Link>
            <AuthOptions />
        </div>
    )
}
export default Header;