import React from "react";
import { fetchSound, deleteSound } from './service/index';
import { Route, Link } from 'react-router-dom';
import LogInPage from './components/LoginPage/LoginPage';
import Arpeggiator from './components/Arpeggiator';
import AmSynth from './components/AmSynth';
import Machine from './components/Machine';
import Plucky from './components/Plucky';
import Poly from './components/Poly';
import Tango from './components/Tango';
import Header from './components/Header';
import tokenService from './service/tokenServices';
import decode from 'jwt-decode';
import P5Wrapper from "./components/P5Wrapper";
import { Button, Grid, Segment, Card } from 'semantic-ui-react';
import MachineSlider from './components/MachineSlider';
import TangoSlider from './components/TangoSlider';
import PolySlider from './components/PolySlider';
import PluckySlider from './components/PluckySlider';
// import ArpeggiatorSlider from './components/ArpeggiatorSlider';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allSound: false,
      loggedIn: true,
      userInfo: null,
      userID: '',
      p5Props: {
        status: "",
      }
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
      // await this.toggleLog()
    }
  }
  

  // Find the token, decode it and set user as logged in
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


  // Handle sound delete
  // deleteEffect = async () => {
  //   const effectClicked = {
  //     key: this.state.name,
  //     name: this.state.name,
  //     value: this.state.Number.parseInt(this.state.calGained)
  //   }
  //   await createEffect(this.props.user, newEffect)
  //   this.getAll()
  // }



// Renders my sounds
// showMySounds = () => {
//   const { fetchSound } = this.state
//   const myCards = fetchSound.map(entry => {
//     const effect = entry.effect
//     const name = entry.name
//     return (<Card key={entry.id} className="my-cards">
//       <Card.Content extra>
//       </Card.Content>
//       <Card.Content>
//         <Card.Meta>{entry.effect}</Card.Meta>
//       </Card.Content>
//     </Card>)
//   })
//   return myCards
// }


render() {
  const { loggedIn, userID, userInfo } = this.state;
  return (
    <div>
      <div className="header-container">
        <Header
          findToken={this.findToken}
          toggleLog={this.toggleLog}
          user={userID}
          userInfo={userInfo}
          login={loggedIn}
        />
      </div>

      <Arpeggiator />
      <AmSynth />

      <h2 className="inst">Press Space to start the beat</h2>
      <h4 className="inst">You can click samples on and off for different patterns</h4>

      <P5Wrapper
        {...this.state.p5Props}
        user={userID}
        login={loggedIn}
        userInfo={userInfo}
        getBranchesNum={this.getBranchesNum}
        onReady={this.onReady}
      />

      <h4 className="inst">Try some sounds out... you have to re-click the button to implement the effect slider</h4>

      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <MachineSlider
                user={userID}
                login={loggedIn}
                userInfo={userInfo} />

            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <TangoSlider
                user={userID}
                login={loggedIn}
                userInfo={userInfo} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <PolySlider
                user={userID}
                login={loggedIn}
                userInfo={userInfo}
              />
            </Segment>
          </Grid.Column>

        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <PluckySlider
                user={userID}
                login={loggedIn}
                userInfo={userInfo}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
           
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        </Grid.Row>
      </Grid>

    </div >
  )
}
}


export default App;


