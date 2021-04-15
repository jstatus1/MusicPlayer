import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions'

//Component Imports
import Header from './components/Navbar/header'
import Upload from './components/Upload/upload'
import ProfileEdit from './components/profile/profileedit'
import DropZone from './components/Upload/drop-zone'
import MediaPlayer from './components/MediaPlayer/mediaplayer'
import Home from './components/Home/Home'
import Notification from './components/Navbar/notifcations/notificaiton_page'
import Library from './components/Library/Library'
//import Routes from './routes'


const Dashboard = () => <h2>Dashboard</h2>
const Landing = () => <h2>Dashboard</h2>

class App extends React.Component
{
        
    //Initial State Initialization
    componentDidMount()
    {
        //Inital Authentication Fetch
        this.props.fetchUser();
        this.props.fetchTracks();
    }


    render()
    {
        return(
            <div>
               <BrowserRouter>
                    <div className="container">
                        <Header/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/discovery" component={Dashboard}/>
                        <Route exact path="/home" component={Home}></Route>
                        <Route exact path="/upload" component={Upload}></Route>
                        <Route exact path="/drop_zone" component={DropZone}></Route>
                        <Route exact path="/library" component={Library}></Route>
                        <Route exact path="/profileedit" component={ProfileEdit}></Route>
                        <Route exact path="/notification" component={Notification}></Route>
                        {this.props.auth != null?  <Route exact path={`/${this.props.auth.username}`} component={ProfileEdit} />: null}

                    </div>
                    <MediaPlayer/>
               </BrowserRouter> 
            </div>)
    }
}

function mapStateToProps(state) {
    return { 
      auth: state.auth_reducer,
      fetch_track: state.fetch_track_reducer
     };
}

export default connect(mapStateToProps, actions)(App);
