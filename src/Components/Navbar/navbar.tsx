import React, {FC} from "react";
import {NavLink} from "react-router-dom"



export const Navbar: FC<any> = props => {
    return (
        <div>
            <ul>
                <li>
                    <NavLink to='/login'>Login</NavLink>
                </li>
                <li>
                    <NavLink to='/profile'>My Profile</NavLink>
                </li>
                <li>
                    <NavLink to='/common'>Common chat</NavLink>
                </li>
                <li>
                    <NavLink to='/work'>Work chat</NavLink>
                </li>
            </ul>
        </div>
    )
}
