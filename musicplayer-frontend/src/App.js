import React from 'react'
import axios from 'axios'
import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions'

//Component Imports
import Header from './components/Navbar/header'
import ProfileEdit from './components/profile/profileedit'

//import Routes from './routes'

const Dashboard = () => <h2>Dashboard</h2>
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
                        <Route exact path="/discovery" component={Dashboard} />
                        {this.props.auth != null?  <Route exact path={`/${this.props.auth.username}`} component={ProfileEdit} />: null}
                       
                    </div>
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