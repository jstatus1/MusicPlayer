import React from 'react'

class RegularNotificationContainer extends React.Component
{
    render()
    {
        return(<div class="follower_content_container mb-2 container notification_item d-flex flex-row justify-content-center align-items-center">
        <div class="col-3">
            <img className="avatar_image" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fdownload_87237.png&f=1&nofb=1" alt="Avatar"/>
        </div>
        <div class="col-9">
           <small><b>Bruno Mars </b> unfollowed you!</small>
            <div className="date_text d-flex flex-column">  
                <i class="bi bi-people"> 6 Feburary 2017</i>
            </div>
        </div>
    </div>)
        
        
    }
}


export default RegularNotificationContainer