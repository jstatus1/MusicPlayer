import React, {Component} from 'react'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Playlists: [
                {name: 'playlist_name'}
            ]
        }
    }

    renderTableData() {
        return this.state.Playlists.map((playlist, index) => {
            const { name } = playlist
            return (
                <tr key={playlist}>
                    <td>{playlist}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1>Playlist Dynamic Table</h1>
                <table id='playlists'>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table

export default Table

const Reports = () => {
    return (
        <div>
            
        </div>
    )
}