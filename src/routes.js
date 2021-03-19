import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TelaPrincipal from './pages/TelaPrincipal';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Home from './pages/Home';
import ClientAnnouncements from './pages/ClientAnnouncements';
import Favourite from './pages/LikedAnnouncements'
import ClientSettings from './pages/ClientSettings'
import NewAnnouncement from './pages/NewAnnouncement'
import Announcement from './pages/Announcement'
import Termo from './pages/TermoAdocao'
import Exception from './pages/Exception'
import Senha from './pages/RedefinePassword'
import EditAnnouncement from './pages/EditAnnouncement'

export default function(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={TelaPrincipal}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/about" component={About}/>
                <Route path="/home" component={Home}/>
                <Route path="/myannouncements" component={ClientAnnouncements}/>
                <Route path="/myfavorites" component={Favourite}/>
                <Route path="/mysettings" component={ClientSettings}/>
                <Route path="/newannouncement" component={NewAnnouncement}/>
                <Route path="/announcement/edit/:id" component={EditAnnouncement}/>
                <Route path="/announcement/:id" component={Announcement}/>
                <Route path="/termo" component={Termo}/>
                <Route path="/redefine-password" component={Senha}/>
                <Route path="/" component={Exception}/>
            </Switch>
        </BrowserRouter>
    )
}