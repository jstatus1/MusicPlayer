  import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ACTIONS from '../store/actions/actions';
import axios from 'axios';
import history from '../utils/history';
import { Link } from 'react-router-dom';

import {TextField , Dialog , DialogActions , DialogContent , DialogContentText , DialogTitle,Button  } from '@material-ui/core'


const RenderComments = (comment) => (
    <div>
        <h3>{comment.comment.comment}</h3>
        <small>{comment.comment.date_created}</small>
        <p>By: {comment.comment.author}</p>
        {
            comment.cur_user_id == comment.comment.user_id ? <Button onClick={()=> this.handleClickOpen(comment.comment.cid, comment.comment.comment)}>Edit</Button>:null
        }
    </div>
)

class ShowPost extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            open: false,
            comment: '',
            cid: ''
        }
    }

    componentDidMount()
    {
        axios.get('/api/get/allpostcomments', {params:
            {post_id: this.props.location.state.post.post.pid}} )
            .then(res => this.props.set_comments(res.data))
            .then(() => this.add_comments_to_state(this.props.comments))
            .catch((err) => console.log(err));
    }


    handleClickOpen = (cid, comment) => {
        this.setState({open: true, comment: comment, cid: cid})
    }

    handleClose = () => (
        this.setState({open: false, comment: '', cid: ''})
    )

    handleCommentChange = (event) => {
        this.setState({comment: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({comment: ''})
    
        const comment = event.target.comment.value
        const user_id = this.props.db_profile[0].uid
        const post_id = this.props.location.state.post.post.pid
        const username = this.props.db_profile[0].username
        const current_time = "Just Now"
        const temp_cid = 63426
    
        const submitted_comment = {cid: temp_cid,
                                   comment: comment,
                                   user_id: user_id,
                                   author: username,
                                   date_created: current_time }
    
        const data = {comment: comment,
                      post_id: post_id,
                      user_id: user_id,
                      username: username }
    
        axios.post('/api/post/commenttodb', data)
          .then(res => console.log(res))
          .catch((err) => console.log(err))
          .then(setTimeout(() => history.replace('/posts'), 700))
        window.scroll({top: 0, left: 0, behavior: 'smooth'})
        this.handleCommentSubmit(submitted_comment)
      }
    
      handleUpdate = () => {
        const comment = this.state.comment
        const cid = this.state.cid
        const user_id = this.props.db_profile[0].uid
        const post_id = this.props.location.state.post.post.pid
        const username = this.props.db_profile[0].username
        const isEdited = true
        const current_time = "Just Now"
    
        const edited_comment = {cid: cid,
                                comment: comment,
                                user_id: user_id,
                                author: username,
                                date_created: current_time,
                                isEdited: isEdited }
    
        const data = {cid: cid,
                      comment: comment,
                      post_id: post_id,
                      user_id: user_id,
                      username: username }
    
        axios.put('/api/put/commenttodb', data)
          .then(res => console.log(res))
          .catch((err) => console.log(err))
        this.handleCommentUpdate(edited_comment);
      }

    handleDeleteComments = () => {
    const cid = this.state.cid
    axios.delete('/api/delete/comment', {data: {cid: cid}} )
      .then(res => console.log(res))
      .catch((err) => console.log(err))
    this.handleCommentDelete(cid)
  }



    render()
    {
        return(
            <div>
                <div>
                    <h2>Post</h2>
                    <h4>{this.props.location.state.post.post.title}</h4>
                    <p>{this.props.location.state.post.post.body}</p>
                    <p>{this.props.location.state.post.post.author}</p>
                </div>
                <div>
                    <h2>Comments:</h2>
                    {this.props.comments? 
                        this.props.comments.map(comment => <RenderComments key={comment.cid} comment={comment} cur_user_id={this.props.db_profile[0].uid}/>):
                        null
                    }
                </div>

                <div>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            id="comment"
                            label="Comment"
                            margin="normal"/>
                        <br/>
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
                
                <div>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            Edit Comment
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <input type="text" value={this.state.comment} onChange={this.handleCommentChange}></input>
                            </DialogContentText>

                            <DialogActions>
                                <Button onClick={() => {this.handleUpdate(); this.handleClose()} }>
                                    Agree
                                </Button>
                                <Button onClick={() => this.handleClose()}>
                                Cancel
                                </Button>
                                <Button onClick={() => {this.handleDelete(); this.handleClose()} }>
                                    Delete
                                </Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                
                
                </div>
            </div>

            
        )
    }
}

function mapStateToProps(state)
{
    return{
        comments: state.props_reducer.comments,
        db_profile: state.auth_reducer.db_profile
    }
}


function mapDispatchToProps(dispatch)
{
    return {
        set_comments: (comments) => dispatch(ACTIONS.fetch_post_comments(comments))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost)