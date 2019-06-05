/* global $ */

import React, { Component } from "react";
import ControlPanel from "../ControlPanel/";
import LogInPage from '../LoginPage/LoginPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import Header from "../Header/";
import tokenService from '../../service/tokenServices'
import decode from 'jwt-decode'
import P5Wrapper from "../P5Wrapper/";
import config from "../../lib/config/";
import { getDrums } from "../../lib/sliders/";

export default class App extends Component {
  // Constructor ---------------------------------------------------------------
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      userInfo: null,
      userID: ''
    }

    const drums = [];
    for (let i = 0; i < config.drumNum; i++) {
      drums.push({ ...getDrums() });
    }

    this.state = {
      p5Props: {
        status: "",
        drums,
      },
    };
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


  // Event handlers ------------------------------------------------------------
  renderPattern = (index, num) => {
    const drums = $.extend(true, [], this.state.p5Props.drums);
    drums[index].gridSize = num;
    this.setState({ p5Props: { ...this.state.p5Props, drums } });
  }

  onReady = () => this.setState({ status: "ready" });

  onSliderChange = (key) => (event) => {
    const drums = $.extend(true, [], this.state.p5Props.drums);
    drums.forEach((drum) => drum[key] = +event.target.value);
    this.setState({ p5Props: { ...this.state.p5Props, drums } });
  }

  // Main renderer 

//   render() {
//     const { loggedIn, userID, userInfo } = this.state;
//     return (
//       <div>

//         {
//           (loggedIn)
//             ? <ProfilePage findToken={this.findToken}  toggleLog={this.toggleLog} user={userID} userInfo={userInfo} login={loggedIn} />
//             : <LogInPage login={loggedIn} toggleLog={this.toggleLog} setCurrentUserInfo={this.setCurrentUserInfo} />
//         }

//       </div>
//     );
//   }

// }



  
  render() {
    return (
      <div className="app">
        {/* Header --------------------------------------------------------- */}
        <Header />
        <p>Header</p>

        {/* Main content --------------------------------------------------- */}
        <div
          className="jumbotron"
          style={{ marginTop: "-8px", background: "rgb(120, 120, 120)" }}
        >
          {/* p5.js sketch ------------------------------------------------- */}
          <P5Wrapper
            {...this.state.p5Props}
            getBranchesNum={this.getBranchesNum}
            onReady={this.onReady}
          />

          {/* Control panel ------------------------------------------------ */}
          <ControlPanel
            drums={this.state.p5Props.drums}
            onSliderChange={this.onSliderChange}
          />

       
        </div>
      </div>
    );
  }
}
