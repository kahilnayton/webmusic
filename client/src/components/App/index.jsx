/* global $ */

import React, { Component } from "react";
import ControlPanel from "../ControlPanel/";
import LogInPage from '../LoginPage/LoginPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import Header from "../Header/Header";
import tokenService from '../../service/tokenServices'
import decode from 'jwt-decode'
import P5Wrapper from "../P5Wrapper/";
import config from "../../lib/config/";
import { getDrums } from "../../lib/sliders/";
// import { MainSynth } from "../../lib/synth/synth";
// import  drumsSamples  from "../../lib/drums/drums";
import '../../App.css'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: '',
      userInfo: null,
      userID: ''
    }

    // this i need to actually specify the tone note 
    // const synth = []
    // synth.push({ MainSynth })

    // const drumsSamples = []
    // drumsSamples.push({ drumsSamples })

    const drums = [];
    for (let i = 0; i < config.drumNum; i++) {
      drums.push({ ...getDrums() });
    }


    this.state = {
      p5Props: {
        status: "",
        drums,
        // MainSynth,
        // drumsSamples,
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
      // await this.toggleLog()
    }
  }

  findToken = async () => {
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


  setBeat = async () => {
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



  render() {
    const { loggedIn, userID, userInfo } = this.state;
    return (
      <div>

        {(!loggedIn) ?
          <div>

            <ProfilePage
              findToken={this.findToken}
              toggleLog={this.toggleLog}
              user={userID}
              userInfo={userInfo}
              login={loggedIn} />


            <Header
              findToken={this.findToken}
              toggleLog={this.toggleLog}
              user={userID}
              userInfo={userInfo}
              login={loggedIn} />


            <P5Wrapper
              {...this.state.p5Props}
              user={userID}
              login={loggedIn}
              userInfo={userInfo}
              getBranchesNum={this.getBranchesNum}
              onReady={this.onReady} />

            <ControlPanel
              drums={this.state.p5Props.drums}
              onSliderChange={this.onSliderChange} />

          </div>

          :

          <LogInPage
            login={loggedIn}
            toggleLog={this.toggleLog}
            setCurrentUserInfo={this.setCurrentUserInfo} />


        }

      </div>
    );
  }

}


