import React from 'react'
import ReactDOM from 'react-dom'

import './Modal_Login.css'

class ModalLogin extends React.Component
{
    render()
    {
        return ReactDOM.createPortal(
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="d-grid gap-2">
                                <button type="button" class="provider-fb btn  justify-content-center align-items-center" >
                                <i class="profider-icon bi bi-facebook"></i>
                                    Continue With Facebook
                                </button>
                                <a type="button" class="provider-google btn" href="/auth/google">
                                    <i class="profider-icon bi bi-google"></i>
                                    Continue With Google
                                </a>
                                <button type="button" class="provider-apple btn" >
                                    <img class="profider-icon-apple" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clker.com%2Fcliparts%2Fi%2Fs%2FH%2Ff%2F4%2FT%2Fapple-logo-white-hi.png&f=1&nofb=1"></img>
                                    Continue With Apple
                                </button>
                                <hr></hr>
                                <input type="text" class="form-control" placeholder="Your Email Address or Username" aria-label="Username" aria-describedby="basic-addon1"></input>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Continue</button>
                            </div> 
                        </div>
                        <div class="modal-footer">
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