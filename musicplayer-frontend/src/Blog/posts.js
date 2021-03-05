import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'
import * as ACTIONS from '../store/actions/actions'
import axios from 'axios'
import moment from 'moment';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core'


const RenderPosts = post => (
    <TableRow>
        <TableCell>
            <Link to={{pathname: '/post/'+ post.post.pid, state:{post}}}><h4>{post.post.title}</h4></Link>
            <br></br>
            <p>{post.post.body}</p>

        </TableCell>
    </TableRow>
)

class Posts extends Component{

    componentDidMount() {
        axios.get('/api/get/allposts')
          .then(res => {this.props.set_posts(res.data); console.log(res.data)})
          .catch((err) => console.log(err))
      }

    render()
    {
        return(
            <div>
                <br/>
                <Link to='/addpost'>
                    <Button color="primary">
                        Add Post
                    </Button>
                </Link>
                
                <h1>Posts</h1>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Title
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.posts ? this.props.posts.map(post => <RenderPosts key={post.pid} post={post}/>) : null}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}


function mapStateToProps(state)
{
    return {
        posts: state.posts_reducer.posts
    }
}

function mapDispatchToProps(dispatch)
{
    return{
        set_posts: (posts) => dispatch(ACTIONS.fetch_db_posts(posts))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Posts)