import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//css import
import './notification_dropdown.css'
import FollowerContainer from './notificaiton_items/follower_container'

class notificationsDropdown extends React.Component
{
    render()
    {
        return(
            <ul class="dropdown-menu notification_dropdown" aria-labelledby="notification_dropdown" >
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <small><b>Notifications</b></small>  
                    <Link className="header_setting" to={`/settings/notification`}> Settings</Link>
                </div>
                <li><hr class="dropdown-divider"/></li>
                
                <div className="notification_body">
                    <FollowerContainer/>
                    <FollowerContainer/>
                    <FollowerContainer/>
                    <FollowerContainer/>
                    <FollowerContainer/>
                    <FollowerContainer/>
                    <FollowerContainer/>
                    <FollowerContainer/>
                    <FollowerContainer/>
                </div>
              
                
                <li><hr class="dropdown-divider"/></li>
                <li>
                    <Link  className="dropdown-item view_all_notification_text" to={`/notification`}>
                        View all notifications
                    </Link>
                </li>
           </ul>
        )
        
    }
}

export default notificationsDropdown