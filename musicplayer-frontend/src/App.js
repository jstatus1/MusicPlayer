import React, {useState} from 'react'
import axios from 'axios'
import Routes from './routes'
import SideNavbar from './components/SideNavbar'
import './App.css'
import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions'

//Component Imports
import Header from './components/Navbar/header'
import Upload from './components/Upload/upload'
import ProfileEdit from './components/profile/profileedit'
import DropZone from './components/Upload/drop-zone'
import MediaPlayer from './components/MediaPlayer/mediaplayer'

//import Routes from './routes'

const Dashboard = () => <h2>Dashboard</h2>
const Landing = () => {
    
}

class App extends React.Component
{
    //Initial State Initialization
    componentDidMount()
    {
        //Inital Authentication Fetch
        this.props.fetchUser();
    }


    render()
    {
        return(
            <div>
               <BrowserRouter>
                    <div className="container">
                        <Header/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/discovery" component={Dashboard} />
                        <Route exact path="/upload" component={Upload}></Route>
                        <Route exact path="/drop_zone" component={DropZone}></Route>
                        {this.props.auth != null?  <Route exact path={`/${this.props.auth.username}`} component={ProfileEdit} />: null}
                        
                    </div>
                    <MediaPlayer/>
               </BrowserRouter> 
            </div>)
    }
}

function mapStateToProps(state) {
    return { 
      auth: state.auth_reducer
     };
}

export default connect(mapStateToProps, actions)(App);

/*/ Edward's SideNavbar

/ for open/close Side Navbar
        const [wid, setWid] = useState('0%');
        const openSidenav = ( ) => { setWid('25%') }
        const closeSidenav = ( ) => { setWid('0%') }

        <div>
            <button onClick={openSidenav}>Menu</button>
            <SideNavbar width={wid} closeNav={closeSidenav}/>
        </div> */