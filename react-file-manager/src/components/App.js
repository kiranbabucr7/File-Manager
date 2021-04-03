import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Dashboard from './Dashboard';
import ForgotPassword from "./ForgotPassword";
import Login from './Login';
import PrivateRoute from "./PrivateRoute";
import Signup from "./Signup";
function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center"
        style={{minHeight: "100vh"}}
      >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              <Route path="/forgot-password" component={ForgotPassword}/>
              <PrivateRoute exact path="/" component={Dashboard}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;