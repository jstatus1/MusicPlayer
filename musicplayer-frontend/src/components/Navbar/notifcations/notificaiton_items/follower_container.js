import React from 'react'

class FollowerContainer extends React.Component
{
    render()
    {
        return(<div class="follower_content_container mb-2 container notification_item d-flex flex-row justify-content-around align-items-center">
        <div class="col-3">
            <img className="avatar_image" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fdownload_87237.png&f=1&nofb=1" alt="Avatar"/>
        </div>
        <div class="col-6">
            <div className="d-flex flex-column">
                <div className="follower_information">
                    <small>
                        <b>Michael Jordan </b> started following you
                    </small>
                </div>
            </div>
        </div>
        <div class="col-3">
            <button className="follow_back_button btn btn-outline-secondary">follow back</button>
        </div>
    </div>)
    }
}

export default FollowerContainer