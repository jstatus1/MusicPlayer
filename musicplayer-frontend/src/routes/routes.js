import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

//Component Imports
import Header from '../components/Navbar/header'
import Upload from '../components/Upload/upload'
import ProfileEdit from '../components/profile/profileedit'
import ProfileView from '../components/profile/ProfileView'
import DropZone from '../components/Upload/drop-zone'
import MediaPlayer from '../components/MediaPlayer/mediaplayer'
import Home from '../components/Home/Home'
import Notification from '../components/Navbar/notifcations/notificaiton_page'
import Reports from '../components/Reports/Reports'

//Library Imports
import Landing from '../components/Landing/Landing'
import LibraryNav from '../components/Library/LibraryNav'
import Overview from '../components/Library/LibraryPages/Overview'
import Tracks from '../components/Library/LibraryPages/Tracks'
import Playlist from '../components/Library/LibraryPages/Playlist'
import Search from '../components/SearchBar/Search'
import Settings from '../components/Settings/Settings'
import SettingsNav from '../components/Settings/SettingsNav'
import PlaylistDisplayPage from '../components/Library/LibraryPages/components/PlaylistDisplayPage'
const Dashboard = () => <h2>Dashboard</h2>


const LibraryRoutes = ({ match }) => (
    <div>
        {/* note the addition of the exact property here */}
        <LibraryNav></LibraryNav>
        <Route exact path={match.url} component={Overview}/>
        <Route exact path={match.url + "/overview"} component={Overview}/>
        <Route exact path={match.url + "/tracks"} component={Tracks}/>
        <Route path={match.url + "/playlist"} component={PlaylistRoutes}/>
    </div>
)

const PlaylistRoutes = ({ match }) => (
    <div>
        <Route exact path={match.url} component={Playlist}/>
        <Route exact path={match.url + "/:playlist_name/:playlist_id"} render={props => <PlaylistDisplayPage {...props.match.params} />}/>
    </div>
)


const SearchRoutes = ({ match }) => (
    <div>
        <Route exact path={match.url} component={Landing}/>
        <Route exact path={match.url + "/:id"} render={props => <Search {...props.match.params} />}/>
    </div>
)

const SettingsRoutes = ({ match }) => (
    <div>
        <h1>Settings</h1>
        <SettingsNav></SettingsNav>
        <Route exact path={match.url} component={Settings}/>
        <Route exact path={match.url + "/:id"} render={props => <Search {...props.match.params} />}/>
    </div>
)

let Routes = () =>
{
    return(<div>
        <BrowserRouter>
             <div className="container">
                 <Header/>
                 <Route exact path="/" component={Landing}/>
                 <Route exact path="/discovery" component={Dashboard}/>
                 <Route exact path="/home" component={Home}></Route>
                 <Route exact path="/upload" component={Upload}></Route>
                 <Route exact path="/drop_zone" component={DropZone}></Route>
                 <Route path="/library" component={LibraryRoutes}></Route>
                 <Route exact path="/profileedit" component={ProfileEdit}></Route>
                 <Route exact path="/notification" component={Notification}></Route>
                 <Route exact path="/reports" component={Reports}></Route>
                 <Route exact path="/profileview" component={ProfileView}></Route>
                 <Route exact path="/profileedit" component={ProfileEdit}></Route>
                 <Route path="/search/" component={SearchRoutes}></Route>
                 <Route path="/settings/" component={SettingsRoutes}></Route>
             </div>
             <MediaPlayer/>
        </BrowserRouter> 
     </div>)
}


export default Routes