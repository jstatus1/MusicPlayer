import React, {component} from 'react'

class Table extends Component {
    constructor(props){
        super(props)
        this.state = {
            playlists: [
                {playlist_name: 'Low fi beats'},
                {playlist_name: 'Hi fi beats'},
                {playlist_name: 'Medium fi beats'}
            ]
        }
    }
    render(){
        return(
            <div>
                <h1> React Dynamic Playlist Table </h1>
            </div>
        )
    }
    renderTableData() {
        return this.state.playlists.map((playlists, index) => {
            return(
                <tr>
                    <td>playlists.playlist_name</td>
                </tr>
            )
        })
    }
    
    render() {
        return (
           <div>
              <h1 id='title'>React Dynamic Table</h1>
              <table id='playlists'>
                 <tbody>
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }
}




export default Table;

