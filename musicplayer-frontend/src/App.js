import React, {useState} from 'react'
import axios from 'axios'
import Routes from './routes'
import SideNavbar from './components/SideNavbar'
import './App.css'

function App(props, state)
{ 
        // for open/close Side Navbar
        const [wid, setWid] = useState('0%');
        const openSidenav = ( ) => { setWid('25%') }
        const closeSidenav = ( ) => { setWid('0%') }

        return(
        
        <div>
            <button onClick={openSidenav}>Menu</button>
            <SideNavbar width={wid} closeNav={closeSidenav}/>
        </div>)
    
}



export default App;