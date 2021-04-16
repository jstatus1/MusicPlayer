import React, { PureComponent } from 'react'
import axios from 'axios'
import './Search_UserInfo.css'

export default class Search_UserInfo extends PureComponent 
{
    state={
        isFollowing:(!Number(this.props.data.currentlyfollows) == 0)
    }

    
    FollowerLogic()
    {
        axios.post('/api/toggle/follows', {params:{"personToFollow":this.props.data.uid}}).then(()=> {
            
        })
    }

    render() {
        return (
            <React.Fragment>
            <div className="d-flex flex-row Search_UserInfo_Profile align-items-center">
                <div className="Search_UserInfo_Profile_Image_Container col-3 ">
                    <img className="Search_UserInfo_Profile_Image" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f101ee52097223.590463d3471b4.jpg"></img>
                    
                </div>
                <div className="Search_UserInfo_Profile_Info col-9">
                    <div className="d-flex flex-column">
                        <h1 className="Search_UserInfo_Profile_Info_Username">{this.props.data.username}</h1>
                        <t6>{this.props.data.first_name } {this.props.data.lastname}</t6>
                        <t6>{this.props.data.record_label}</t6>
                        <div className="col-6">
                            
                                <button className="btn btn-outline-dark" onClick={()=> {this.FollowerLogic()}}>
                                    {
                                        (this.state.isFollowing)? <i class="bi bi-person-check-fill">Unfollow</i>:
                                        <i class="bi bi-person-plus-fill"> Follow</i>
                                        
                                    }
                                </button>
                                
                            
                        </div>
                    </div>
                </div>
                
            </div>
            <hr></hr>
            </React.Fragment>
        )
    }
}
