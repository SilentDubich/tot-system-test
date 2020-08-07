import React, {FC} from "react";
import {NavLink} from "react-router-dom"
import SNavbar from "./navbarStyles.module.css"


export const Navbar: FC<any> = props => {
    return (
        <div>
            <ul className={SNavbar.container_ul__listStyleNone}>
                <li className={SNavbar.container_li__marginBottom}>
                    <NavLink activeClassName={SNavbar.container_li__decorActive} className={SNavbar.container_li__decor} to='/profile'>My Profile</NavLink>
                </li>
                <li className={SNavbar.container_li__marginBottom}>
                    <NavLink activeClassName={SNavbar.container_li__decorActive} className={SNavbar.container_li__decor} to='/common'>Common chat</NavLink>
                </li>
                <li className={SNavbar.container_li__marginBottom}>
                    <NavLink activeClassName={SNavbar.container_li__decorActive} className={SNavbar.container_li__decor} to='/work'>Work chat</NavLink>
                </li>
            </ul>
        </div>
    )
}
