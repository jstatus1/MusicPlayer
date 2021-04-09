import React from 'react'

class RegularNotificationContainerLink extends React.Component
{
    render()
    {
        return(<div class="follower_content_container mb-2 container notification_item d-flex flex-row justify-content-center align-items-center">
        <div class="col-3">
            <img className="avatar_image" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fdownload_87237.png&f=1&nofb=1" alt="Avatar"/>
        </div>
        <div class="col-6">
            <small><b>Bruno Mars </b> has just a new album!</small>
            <div className="date_text d-flex flex-column">  
                <i class="bi bi-people"> 6 Feburary 2017</i>
            </div>
        </div>
        <div class="col-3">
            <span className="follow_back_button"><i class="bi bi-vinyl-fill"> LISTEN</i></span>
        </div>
    </div>)
        
        
    }
}


export default RegularNotificationContainerLink