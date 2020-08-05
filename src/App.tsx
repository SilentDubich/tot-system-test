import React from 'react';
import './App.css';
import {MyProfileWrapper} from "./Components/MyProfile/myProfile";
import {Navbar} from "./Components/Navbar/navbar";
import {Redirect, Route, Switch} from "react-router";
import {CommonChatWrapper} from "./Components/CommonChat/commonChat";
import {LoginPage} from "./Components/Login/loginPage";

export const App = (props: any) => {
    let Profile = () => <MyProfileWrapper/>
    let Common = () => <CommonChatWrapper/>
    let Login = () => <LoginPage/>
  return (
      <div>
          <div>
              <Navbar/>
          </div>
        <div>
            <Switch>
                <Route path='/profile' render={Profile}/>
                <Route path='/common' render={Common}/>
                <Route path='/work' render={Common}/>
                <Route path='/login' render={Login}/>
                <Redirect from='/' to='/profile'/>
            </Switch>
        </div>
      </div>
  );
}

