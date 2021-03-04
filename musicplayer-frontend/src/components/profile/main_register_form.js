import React from 'react'

class MainRegisterForm extends React.Component
{
    render()
    {
        return(
            <div>
                <button>Facebook</button>
                <button>Google</button>
                <button>Apple</button>
                <hr></hr>
                <input placeholder="Your email address or profile url"></input>
                <br></br>
                <button>Continue</button>
            </div>
        )
    }
}

export default MainRegisterForm;