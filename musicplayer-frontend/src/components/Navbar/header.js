import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Styling


class Header extends Component {

  render() {
    return(<nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <a className="navbar-brand" href="/">UH Sound Cloud</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <button type="button" class="btn btn-outline-dark">Sign In</button>
                      </li>
                      <li className="nav-item">
                      <button type="button" class="btn btn-danger">Create Account</button>
                      </li>
                    </ul>
                  </div>
            </nav> )}
}

function mapStateToProps(state) {
  return {
    is_authenticated: state.auth_reducer.is_authenticated
  }
}

export default connect(mapStateToProps)(Header);