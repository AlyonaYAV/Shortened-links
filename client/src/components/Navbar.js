import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink, useHistory } from 'react-router-dom';

export const Navbar = ()=>{
    const history = useHistory();
    const auth = useContext(AuthContext);
    const logoutHandler = (e)=>{
        e.preventDefault();
        auth.logout();
        history.push("/");
    };
    return (
        <nav>
            <div className="nav-wrapper">
            <span className="brand-logo">Shorten links</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li> <NavLink to="/create">Create</NavLink> </li>
                <li> <NavLink to="/links">Links</NavLink> </li>
                <li> <a href="/" onClick={logoutHandler}>Logout</a> </li>
            </ul>
            </div>
        </nav>
   )
}