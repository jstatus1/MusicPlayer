import React from 'react'
import axios from 'axios'

class App extends React.Component
{
    //taking in a response
    state = {
        hello : null
    }

    componentDidMount()
    {
        //example of a request
        axios.get('/hello')
        .then(res => this.setState({hello: res.data}))
        .catch(err => console.log(err))
    }

    render()
    {
        return(<div>
            {this.state.hello ? <div> {this.state.hello} </div>: null}
        </div>)
    }
}

export default App;