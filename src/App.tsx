import React from 'react';
import logo from './logo.svg';
import './App.css';
import {MyProfileWrapper} from "./Components/MyProfile/myProfile";
import {Navbar} from "./Components/Navbar/navbar";
import {Redirect, Route, Switch} from "react-router";
import {CommonChatWrapper} from "./Components/CommonChat/commonChat";
import {WorkChat} from "./Components/WorkChat/workChat";

export const App = (props: any) => {
    let Profile = () => <MyProfileWrapper/>
    let Common = () => <CommonChatWrapper/>
    let Work = () => <WorkChat/>
  return (
      <div>
          <div>
              <Navbar/>
          </div>
        <div>
            <Switch>
                <Route path='/profile' render={Profile}/>
                <Route path='/common' render={Common}/>
                <Route path='/work' render={Work}/>
                <Redirect from='/' to='/profile'/>
            </Switch>
        </div>
      </div>
  );
}

