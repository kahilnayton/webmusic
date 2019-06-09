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
import { createTheme } from '../../service/index'
import { getColors } from "../../lib/sliders/";
import Machine from '../../components/Machine'
import SimpleLoop from '../../components/SimpleLoop'
import { Button, Checkbox, Form, Divider, Grid, Segment } from 'semantic-ui-react'
// import { getEffect } from "../../lib/synth/synth";
// import  drumsSamples  from "../../lib/drums/drums";
import '../../App.css'

export default class App extends Component {
  constructor() {
    super();

    const colors = [];
    // for (let i = 0; i < config.colorNum; i++) {
    colors.push({ ...getColors() });
    // console.log(colors[1], colors, "colors")
    // }

    //   const effect = []
    //   for (let i = 0; i < config.drumNum; i++) {
    //   effect.push({...getEffects()})
    //   console.log(effect, 'effect')

    // }

    // const color = this.getColor();


    this.state = {
      loggedIn: '',
      userInfo: null,
      userID: '',
      p5Props: {
        status: "",
        colors,
        // MainSynth,
        // drumsSample
      }
    }

    // this i need to actually specify the tone note 
    // const synth = []
    // synth.push({ MainSynth })

    // const drumsSamples = []
    // drumsSamples.push({ drumsSamples })

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

  // getColor = () => {
  //   return 'red';
  // }

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
  // Where the crud happens

  saveTheme = async () => {
    const themeSelectedParams = {
      name: this.state.name,
      red: this.state.Number.parseInt(this.state.value),
      green: this.state.Number.parseInt(this.state.value),
      blue: this.state.Number.parseInt(this.state.value)
    }
    await createTheme(this.props.user, themeSelectedParams)
    this.getAll()

  }


  // fetchThemes = async () => {
  //   const themeClicked = {
  //     key: this.state.name,
  //     name: this.state.name,
  //     value: this.state.Number.parseInt(this.state.calGained)
  //   }
  //   await createEffect(this.props.user, newEffect)
  //   this.getAll()

  // deleteEffect = async () => {
  //   const effectClicked = {
  //     key: this.state.name,
  //     name: this.state.name,
  //     value: this.state.Number.parseInt(this.state.calGained)
  //   }
  //   await createEffect(this.props.user, newEffect)
  //   this.getAll()



  // <Button onSubmit={()=>this.addNewFood()}></Button>


  //   this.setState({
  //     loggedIn: loggedIn,
  //     userInfo: userInfo,
  //     userID: userID,
  //   });
  // }


  // Event handlers ****
  renderPattern = (index, num) => {
    const drums = $.extend(true, [], this.state.p5Props.drums);
    drums[index].gridSize = num;
    this.setState({ p5Props: { ...this.state.p5Props, drums } });
  }

  onReady = () => this.setState({ status: "ready" });

  onSliderChange = (key) => (event) => {
    const colors = $.extend(true, [], this.state.p5Props.colors);
    colors.forEach((color) => color[key] = +event.target.value);
    this.setState({ p5Props: { ...this.state.p5Props, colors } });
    console.log(colors, this.state.p5Props, 'savinging theme')
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
    // this.setState(state => ({
    //   ...state,
    //   'p5Props': {
    //     ...state.p5props,
    //     updateApp: this.updateApp
    //   }
    // }))
    // // console.log(p5props)
  }


  render() {
    const { loggedIn, userID, userInfo } = this.state;
    return (
      <div>
        {/* 
        {(loggedIn) ?
          <div> */}



        <Button inverted color="blue"
          onSubmit={() => this.saveTheme()}>Save Theme</Button>

        <Button inverted color="pink"
          onSubmit={() => this.saveTheme()}>Delete Theme</Button>

        <Button inverted color="orange"
          onSubmit={() => this.toggleLog()}>Logout</Button>



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
          onReady={this.onReady}
        />

        <Machine />

        <SimpleLoop />

        <ControlPanel
          colors={this.state.p5Props.colors}
          onSliderChange={this.onSliderChange} />

        <ProfilePage
          findToken={this.findToken}
          toggleLog={this.toggleLog}
          user={userID}
          userInfo={userInfo}
          login={loggedIn} />



        {/* </div>

          :

          <LogInPage
            login={loggedIn}
            toggleLog={this.toggleLog}
            setCurrentUserInfo={this.setCurrentUserInfo} />


        } */}

      </div>
    );
  }

}


