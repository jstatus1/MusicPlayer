import React, { PureComponent } from 'react'

import './Search_UserInfo.css'

export default class Search_UserInfo extends PureComponent {
    render() {
        return (
            <div className="d-flex flex-row Search_UserInfo_Profile">
                <div className="Search_UserInfo_Profile_Image_Container col-3 ">
                    <img className="Search_UserInfo_Profile_Image" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f101ee52097223.590463d3471b4.jpg"></img>
                    
                </div>
                <div className="Search_UserInfo_Profile_Info col-9">
                    <h1>{this.props.data.username}</h1>
                    <t6>{this.props.data.record_label}</t6>
                    <t6>{this.props.data.record_label}</t6>
                    {(Number(this.props.data.currentlyfollows) == 0)?
                        <button className="btn btn-outline-dark"> <i class="bi bi-person-plus-fill"> Follow</i></button>:
                        <button className="btn btn-outline-dark"> <i class="bi bi-person-check-fill">Unfollow</i></button>
                    }
                </div>
            </div>
        )
    }
}
