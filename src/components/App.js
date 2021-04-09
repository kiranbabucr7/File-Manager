import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import ForgotPassword from "./Authentication/ForgotPassword";
import Login from './Authentication/Login';
import PrivateRoute from "./Authentication/PrivateRoute";
import Profile from './Authentication/Profile';
import Signup from "./Authentication/Signup";
import UpdateProfile from "./Authentication/UpdateProfile";
import Dashboard from "./FIleManager/Dashboard"
function App() {
  return (
      <Router>
        <AuthProvider>
          <Switch>
            {/* FILE MANAGER */}
            <PrivateRoute exact path="/" component={Dashboard}/>
            <PrivateRoute exact path="/Folder/:folderId" component={Dashboard}/>
            {/* AUTH */}
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
            {/* USER */}
            <PrivateRoute path="/user" component={Profile}/>
            <PrivateRoute path="/update-profile" component={UpdateProfile}/>
          </Switch>
        </AuthProvider>
      </Router>
  );
}

export default App;
