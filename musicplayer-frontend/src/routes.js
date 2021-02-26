import React, {Component} from 'react'
import * as ACTIONS from './store/actions/actions'
import {connect} from 'react-redux'
import Component1 from './functional/component1'
import Callback from './functional/callback'

import Container1 from './containers/container1'
import Header from './containers/header'
import Profile from './containers/profile'

import history from './utils/history'
import AuthCheck from './utils/authcheck'
import Auth from './utils/auth';

import Posts from './Blog/posts'
import AddPost from './Blog/addpost'
import ShowPost from './Blog/showpost'
import EditPost from './Blog/editpost'

import UnauthRedirect from './functional/unauthredirect'
import ProtectedRoute from './functional/protectedroute'

import axios from 'axios';
 


import {Router, Route, Switch, Redirect} from 'react-router'

export const auth = new Auth()

const handleAuthentication = (props) => {
    if(props.location.hash) {
      auth.handleAuth()
    }
  }


const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth.isAuthenticated() === true
    ? <Component auth={auth} {...props} />
    : <Redirect to={{pathname:'/redirect'}} />
  }
  />
)

class Routes extends Component{
  send_profile_to_db = (profile) => {
    const data = profile
    
    axios.post('/api/posts/userprofiletodb', data )
      .then(axios.get('/api/get/userprofilefromdb', {params: {email: profile.profile.email}})
        .then(res => this.props.set_db_profile(res.data)) )
  }

  componentDidMount() {
    if(auth.isAuthenticated()) {
      this.props.login_success()
      auth.getProfile()
      
      setTimeout(() => {this.props.add_profile(auth.userProfile)}, 400)
      setTimeout(() => {this.send_profile_to_db(auth.userProfile)}, 400)
    }
    else {
      this.props.login_failure()
      this.props.remove_profile()
      this.props.remove_db_profile()
      history.replace('/')
    }
  }

    render()
    {
        return(
            <div>
                <Router history={history}>
                    <div>
                    <Header auth={auth}/>
                        <Switch>
                            <Route exact path='/' render={(props)=><Container1 auth={auth}/>}></Route>
                            <Route path='/authcheck' render={() => <AuthCheck auth={auth} /> } />
                            <Route path='/redirect' component={UnauthRedirect}/>
                            <Route path='/callback' render={(props) => {handleAuthentication(props); return Callback}}/>
                            <Route path="/component/:id" render={(props)=><Component1 {...props}/>}/>

                            <Route path="/posts" component={Posts}/>
                            <Route path="/post/:pid" component={ShowPost} />
                            <Route path="/addpost" component={AddPost}/>
                            <Route path = "/editpost/:pid" component={EditPost}/>

                            <PrivateRoute path="/privateroute" auth={auth} component={ProtectedRoute}/>
                            <PrivateRoute path="/profile" auth={auth} component={Profile}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    add_profile: (profile) => dispatch(ACTIONS.add_profile(profile)),
    remove_profile: () => dispatch(ACTIONS.remove_profile()),
    set_db_profile: (profile) => dispatch(ACTIONS.set_db_profile(profile)),
    remove_db_profile: () => dispatch(ACTIONS.remove_db_profile())
  }
}

export default connect(null,mapDispatchToProps) (Routes)