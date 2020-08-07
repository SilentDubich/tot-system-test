import React, {FC} from 'react';
import './App.css';
import {MyProfileWrapper} from "./Components/MyProfile/myProfile";
import {Navbar} from "./Components/Navbar/navbar";
import {Redirect, Route, Switch} from "react-router";
import {CommonChatWrapper} from "./Components/Chat/chat";
import {LoginPageWrapper} from "./Components/Login/loginPage";
import {RegisterPageWrapper} from "./Components/Registration/registrPage";
import {LogOutPageWrapper} from "./Components/Login/logOutButton";
import {NavLink} from "react-router-dom";
import SCommons from "./Components/CommonStyles/commonStyles.module.css";

type PropsType = {
    isLogged: boolean | null
    getAuth: () => void
}


export const App:FC<PropsType> = (props) => {
    let Profile = () => <MyProfileWrapper/>
    let Common = () => <CommonChatWrapper/>
    let Login = () => <LoginPageWrapper/>
    let Registr = () => <RegisterPageWrapper/>
    const buttonClasses = `${SCommons.commonStyle_button__violet}`
  return (
      <div>
          {props.isLogged && <div><LogOutPageWrapper/></div>}
          {!props.isLogged && <div><NavLink className={buttonClasses} to='/login'>Login</NavLink></div>}
          <div className={SCommons.commonStyle_items__displayFlex}>
              <div className={SCommons.commonStyle_navBar__flexSize}>
                  <Navbar/>
              </div>
              <div className={SCommons.commonStyle_mainContent__flexSize}>
                  <Switch>
                      <Route path='/profile' render={Profile}/>
                      <Route path={['/common', '/work']} render={Common}/>
                      <Route path='/login' render={Login}/>
                      <Route path='/register' render={Registr}/>
                      <Redirect from='/' to='/profile'/>
                  </Switch>
              </div>
          </div>
      </div>
  );
}


