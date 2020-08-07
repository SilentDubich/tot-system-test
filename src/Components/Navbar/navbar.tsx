import React, {FC} from "react";
import {NavLink} from "react-router-dom"
import SNavbar from "./navbarStyles.module.css"


export const Navbar: FC<any> = props => {
    return (
        <div>
            <ul className={SNavbar.container_ul__listStyleNone}>
                <li className={SNavbar.container_li__marginBottom}>
                    <NavLink activeClassName={SNavbar.container_li__decorActive} className={SNavbar.container_li__decor} to='/profile'>Мой профиль</NavLink>
                </li>
                <li className={SNavbar.container_li__marginBottom}>
                    <NavLink activeClassName={SNavbar.container_li__decorActive} className={SNavbar.container_li__decor} to='/common'>Просто чат</NavLink>
                </li>
                <li className={SNavbar.container_li__marginBottom}>
                    <NavLink activeClassName={SNavbar.container_li__decorActive} className={SNavbar.container_li__decor} to='/work'>Рабочий чат</NavLink>
                </li>
            </ul>
        </div>
    )
}
