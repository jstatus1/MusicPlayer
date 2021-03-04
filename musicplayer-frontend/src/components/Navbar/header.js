import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends Component {

  render() {
    return(
        <div>
          {
            !this.props.is_authenticated
            ? <React.Fragment>
                 <Link to='/' style={{padding: '5px'}}>
                  Home
                </Link>
                <button onClick={() => this.props.auth.login()} style={{marginRight: '5px'}} >Sign In</button>
                <button onClick={() => this.props.auth.login()}>Create Account</button>
                <button onClick={() => this.props.auth.login()}>Upload</button>
            </React.Fragment> : 
            <React.Fragment>
                <Link to='/musicProfile' style={{padding: '5px'}}>
                Profile
                </Link>
                <button onClick={() => this.props.auth.logout()} style={{marginRight: '5px'}} >Log Out</button>
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