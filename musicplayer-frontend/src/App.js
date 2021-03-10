import React from 'react'
import axios from 'axios'
import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions'


import Header from './components/Navbar/header'

//import Routes from './routes'

const Dashboard = () => <h2>Dashboard</h2>
const MusicPage = () => <h2>MusicPage</h2>
const Landing = () => <h2>Landing</h2>


class App extends React.Component
{
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
                        <Route path="/main" component={Dashboard}/>
                    </div>
               </BrowserRouter> 
            </div>)
    }
}

export default connect(null, actions)(App);