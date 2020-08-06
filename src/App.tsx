import React from 'react';
import './App.css';
import {MyProfileWrapper} from "./Components/MyProfile/myProfile";
import {Navbar} from "./Components/Navbar/navbar";
import {Redirect, Route, Switch} from "react-router";
import {CommonChatWrapper} from "./Components/CommonChat/commonChat";
import {LoginPageWrapper} from "./Components/Login/loginPage";
import {RegisterPageWrapper} from "./Components/Registration/registrPage";
import {LogOutPageWrapper} from "./Components/Login/logOutPage";

export const App = (props: any) => {
    let Profile = () => <MyProfileWrapper/>
    let Common = () => <CommonChatWrapper/>
    let Login = () => <LoginPageWrapper/>
    let Registr = () => <RegisterPageWrapper/>
  return (
      <div>
          <div>
              <LogOutPageWrapper/>
          </div>
          <div>
              <Navbar/>
          </div>
        <div>
            <Switch>
                <Route path='/profile' render={Profile}/>
                <Route path={['/common', '/work']} render={Common}/>
                <Route path='/login' render={Login}/>
                <Route path='/register' render={Registr}/>
                <Redirect from='/' to='/profile'/>
            </Switch>
        </div>
      </div>
  );
}


