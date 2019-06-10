/* global $ */

import React, { Component } from "react";
import {Route, Link} from 'react-router-dom'
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
import Machine from '../Machine/Machine'
import MachineSlider from '../../components/Machine/MachineSlider'
import TangoSlider from '../../components/Tango/TangoSlider'
import PolySlider from '../../components/Poly/PolySlider'
import ArpeggiatorSlider from '../../components/Arpeggiator/ArpeggiatorSlider'
import SimpleLoop from '../../components/SimpleLoop'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
// import { getEffect } from "../../lib/synth/synth";
// import  drumsSamples  from "../../lib/drums/drums";
import '../../App.css'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: true,
      userInfo: null,
      userID: 1,
      p5Props: {
        status: "",
      }
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
    console.log('logout')
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

  }


  render() {
    const { loggedIn, userID, userInfo } = this.state;
    return (
      <div>
        
        {(loggedIn) ?
          <div>

        <div className="header-container">

          <Button inverted color="blue"
            onSubmit={() => this.saveTheme()}>All Sounds</Button>

          <Button inverted color="pink"
            onSubmit={() => this.saveTheme()}>My Sounds</Button>

          <Link to='/'><Button inverted color="orange"
            onClick={() => this.toggleLog()}>Logout
           
            </Button>
            </Link>

        </div>

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

        {/* <Machine /> */}
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <MachineSlider 
                 user={userID}
                 login={loggedIn}
                 userInfo={userInfo}/>
        
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <TangoSlider 
                 user={userID}
                 login={loggedIn}
                 userInfo={userInfo}/>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <PolySlider />
              </Segment>
            </Grid.Column>

          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <ArpeggiatorSlider />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>2</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>3</Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment>1</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>2</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>2</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>






        {/* <SimpleLoop /> */}

        {/* <ControlPanel
          colors={this.state.p5Props.colors}
          onSliderChange={this.onSliderChange} /> */}

        <ProfilePage
          findToken={this.findToken}
          toggleLog={this.toggleLog}
          user={userID}
          userInfo={userInfo}
          login={loggedIn} />



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


