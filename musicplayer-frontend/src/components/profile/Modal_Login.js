import React from 'react'
import ReactDOM from 'react-dom'

import './Modal_Login.css'

class ModalLogin extends React.Component
{
    render()
    {
        return ReactDOM.createPortal(
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-grid gap-2">
                                <button type="button" className="provider-fb btn  justify-content-center align-items-center" >
                                <i className="profider-icon bi bi-facebook"></i>
                                    Continue With Facebook
                                </button>
                                <a type="button" className="provider-google btn" href="/auth/google">
                                    <i className="profider-icon bi bi-google"></i>
                                    Continue With Google
                                </a>
                                <button type="button" className="provider-apple btn" >
                                    <img class="profider-icon-apple" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clker.com%2Fcliparts%2Fi%2Fs%2FH%2Ff%2F4%2FT%2Fapple-logo-white-hi.png&f=1&nofb=1"></img>
                                    Continue With Apple
                                </button>
                                <hr></hr>
                                <input type="text" className="form-control" placeholder="Your Email Address or Username" aria-label="Username" aria-describedby="basic-addon1"></input>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Continue</button>
                            </div> 
                        </div>
                        <div className="modal-footer">
                            <p className="sc-type-light">
                                <span>
                                    We may use your email and devices for updates and tips on SoundCloud's products and services, and for activities notifications. You can unsubscribe for free at any time in your notification settings.
                                </span>
                            </p>
                        </div>
                        </div>
                    </div>
                </div> ,
                document.querySelector('#modalLogin')
        )
    }
}


export default ModalLogin;