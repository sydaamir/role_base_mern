import React from 'react';
import { Link } from 'react-router-dom';

import AuthOptions from './authOptions';
import '../components/style.global.css';

const Header = () => {
    return (
        <header id="header">
            <Link className="title" to="/"><h1>Role Base Auth MERN </h1></Link>
            <AuthOptions />
        </header>
    )
}
export default Header;