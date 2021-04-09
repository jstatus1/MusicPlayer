import React from 'react'

//css import
import './follower_container.css'

class FollowerContainer extends React.Component
{
    render()
    {
        return(<div class="follower_content_container mb-2 container notification_item d-flex flex-row justify-content-center align-items-center">
        <div class="col-3">
            <img className="avatar_image" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fdownload_87237.png&f=1&nofb=1" alt="Avatar"/>
        </div>
        <div class="col-6">
            <small><b>Michael Jordan </b> started following you</small>
            <div className="date_textd-flex flex-column">
                <i class="bi bi-people"> 6 Feburary 2017</i>
            </div>
        </div>
        <div class="col-3">
            <span className="follow_back_button"><i class="bi bi-person-plus"></i> follow back</span>
        </div>
    </div>)
    }
}

export default FollowerContainer