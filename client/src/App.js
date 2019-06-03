import React, { Component } from 'react';
import LogInPage from './components/LoginPage/LoginPage'
import ProfilePage from './components/ProfilePage/ProfilePage.js'
import tokenService from './service/tokenServices.js'
import decode from 'jwt-decode'
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      userInfo: null,
      userID: ''
    }

  }


  componentDidMount = async () => {
    document.title = 'Web Music'
    let token = await tokenService.fetchToken()
    if (token) {
      const userInfo = {}
      const data = decode(token)
      userInfo.name = data.name
      await this.setCurrentUserInfo(userInfo)
      await this.toggleLog()
    }
  }

  findToken = async()=>{
    let token = await tokenService.fetchToken()
    if (token) {
      const data = decode(token)
      await this.setCurrentUserInfo(data)
      this.setState({
        userID: data.id
      });
    }

  }

  setCurrentUserInfo = async (userInfo) => {
    this.setState({
      userInfo: userInfo
    })
  }

  toggleLog = async () => {
    const loggedIn = !this.state.loggedIn
    const userInfo = loggedIn ? this.state.userInfo : null
    const userID = loggedIn ? this.state.userInfo.id : ''
    if (!loggedIn) { localStorage.clear() }


  this.setState({
    loggedIn: loggedIn,
    userInfo: userInfo,
    userID: userID,
  });
}




    render() {
      const { loggedIn, userID, userInfo } = this.state;
      return (
        <div>
  
          {
            (loggedIn)
              ? <ProfilePage findToken={this.findToken}  toggleLog={this.toggleLog} user={userID} userInfo={userInfo} login={loggedIn} />
              : <LogInPage login={loggedIn} toggleLog={this.toggleLog} setCurrentUserInfo={this.setCurrentUserInfo} />
          }
  
        </div>
      );
    }
  
  }

export default App;
