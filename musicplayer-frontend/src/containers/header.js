import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends Component {

  render() {
    return(
        <div>
          <Link to='/' style={{padding: '5px'}}>
            Home
          </Link>
          <Link to='/profile' style={{padding: '5px'}}>
            Profile
          </Link>
          <Link to='/musicProfile' style={{padding: '5px'}}>
            Music Profile
          </Link>
          <Link to='/component1' style={{padding: '5px'}}>
            Component 1
          </Link>
          <Link to='/container1' style={{padding: '5px'}}>
            Container 1
          </Link>
          <Link to='/form1' style={{padding: '5px'}}>
            Form 1
          </Link>
          <Link to='/posts' style={{padding: '5px'}}>
             Forum
          </Link>
          <Link to='/privateroute' style={{padding: '5px'}}>
            Private Route
          </Link>


          {/* {!this.props.is_authenticated
            ? <button onClick={() => this.props.auth.login()}>Login With Auth0</button>
            : <button onClick={() => this.props.auth.logout()}>Logout</button>
          } */}

          {
            !this.props.is_authenticated
            ? <React.Fragment>
                <button onClick={() => this.props.auth.login()}>Sign In</button>
                <button onClick={() => this.props.auth.logout()}>Create Account</button>
            </React.Fragment> : <React.Fragment>

            </React.Fragment>
          }

          <br />
          <br />
          <br />
        </div>
    )}
}

function mapStateToProps(state) {
  return {
    is_authenticated: state.auth_reducer.is_authenticated
  }
}

export default connect(mapStateToProps)(Header);