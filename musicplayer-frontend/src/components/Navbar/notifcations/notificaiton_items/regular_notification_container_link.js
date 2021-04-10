import React from 'react'
import axios from 'axios'


class RegularNotificationContainerLink extends React.Component
{
    state = {
        avatar_img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fdownload_87237.png&f=1&nofb=1",
        sender_name: "Bruno Mars",
        date: this.props.data.created_at
    }
    

    render()
    {
        return(<div class="follower_content_container mb-2 container notification_item d-flex flex-row justify-content-center align-items-center">
                <div class="col-3">
                    <img className="avatar_image" src={this.state.avatar_img} alt="Avatar"/>
                </div>
                <div class="col-6">
                    <small><b>{this.state.sender_name} </b> has just a new album!</small>
                    <div className="date_text d-flex flex-column">  
                        <i class="bi bi-people"> {this.state.date}</i>
                    </div>
                </div>
                <div class="col-3">
                    <span className="follow_back_button"><i class="bi bi-vinyl-fill"> LISTEN</i></span>
                </div>
            </div>) 
    }
}


export default RegularNotificationContainerLink