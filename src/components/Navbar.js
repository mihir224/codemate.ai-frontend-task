import React from 'react';
import code from '../code.png';
import '../styles/Navbar.css';


function Navbar(){
    return (
        <div id='navbar'>
                <img id ='logo-img' src={code} height='30' width='60'></img>
                <h1 id='logo-text'>CodeInspector</h1>
        </div>
    )
}

export default Navbar;