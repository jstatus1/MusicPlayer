import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import {SelectedAudioReducer} from './current_audio_reducer';



const rootReducer = combineReducers({
  auth_reducer: AuthReducer,
  selected_audio_reducer: SelectedAudioReducer
})

export default rootReducer;