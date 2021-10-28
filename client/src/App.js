import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

class App extends React.Component {
  state = {
    data: null,
    token: null,
    user: null
  }

  componentDidMount() {
    axios.get('http://localhost:8080')
    .then((response)  => {
      this.setState({
        data: response.data
      })    

   })
   .catch((error) => {
    console.error(`Error fetching data: ${error}`); 
  })

  this.authenticateUser();
}
authenticateUser = () => {
  const token = localStorage.getItem('token');

  if(!token) {
    localStorage.removeItem('user')
    this.setState({ user: null });
  }
  if (token) {
    const config = {
      headers: {
        'x-auth-token': token
      }
    }
    axios.get('http://localhost:8080/api/auth', config)
    .then((response) => {
      localStorage.removeItem('user');
      this.setState({ user: null });
      console.error(`Error logging in: ${error}`);
    })
  }
}
logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({ user: null, token: null });
}
  
  render() {
    let { user, data } = this.state;
    const authProps = {
      authenticateUser: this.authenticateUser,
    }
    return (
      <Router>
      <div className="App">
        <header className="App-header">
         <h1> GoodThings</h1>
         <ul>
           <li>
             <Link to='/'>Home</Link>
           </li>
           <li>
             <Link to='/register'>Register</Link>
           </li>
           <li>
             {user ?
             <Link to="" onClick={this.logOut}>Log out</Link> :
             <Link to="/login">Log in </Link>


             }
             <Link to='/login'>Login</Link>
           </li>
         </ul>   
        </header>
        <main>
          <Route exact path='/'>
            {user ?
            <React.Fragment>
              <div>Hello {user} !</div>
              <div>{data}</div>
              </React.Fragment> :
              <React.Fragment>
                Please Register or Login
                </React.Fragment>
            }
          </Route>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
          </main>
      </div>
      </Router>

    );
  }
}


export default App;
