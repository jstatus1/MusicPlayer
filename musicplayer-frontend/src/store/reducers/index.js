import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import UserReducer from './user_reducer';
import PostsReducer from './post_reducer';



const rootReducer = combineReducers({
  auth_reducer: AuthReducer,
  user_reducer: UserReducer,
  posts_reducer: PostsReducer 
})

export default rootReducer;