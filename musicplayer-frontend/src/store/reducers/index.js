import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import PostsReducer from './post_reducer';
import AudioUploadReducer from './audioupload_reducer';



const rootReducer = combineReducers({
  auth_reducer: AuthReducer,
  posts_reducer: PostsReducer 
})

export default rootReducer;