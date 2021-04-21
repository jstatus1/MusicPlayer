import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import {SelectedAudioReducer, PreviousAudioReducer} from './current_audio_reducer';
import * as AudioReducer from './audio_reducer'



const rootReducer = combineReducers({
  auth_reducer: AuthReducer,
  selected_audio_reducer: SelectedAudioReducer,
  set_previous_audio_reducer: PreviousAudioReducer,
  fetch_track_reducer: AudioReducer.TracksReducer,
  fetch_playlists_reducer: AudioReducer.PlaylistsReducer,
  fetch_albums_reducer: AudioReducer.AlbumsReducer
})

export default rootReducer;