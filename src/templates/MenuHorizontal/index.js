import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

export default function MenuHorizontal(){
    return (
        <nav className="menu-horizontal">
            <h1>GetPet</h1>
            <div className="menu-right">
                <Link className="menu-link" to="/about"> <h2>SOBRE</h2> </Link>
                <Link className="menu-link" to="/register"> <h2>CADASTRE-SE</h2> </Link>
                <Link className="menu-link" to="/login"><button className="purple">LOGIN</button></Link>
            </div>
        </nav>
    )
}