import React, { Component } from 'react'
import { Input, Icon, Button } from 'semantic-ui-react'
import {createSound} from '../service/index'
import AmSynthControl from './AmSynthControl.jsx'

export default class AmSynth extends Component {
  constructor() {
    super()
    this.state = {
      name: 'Am',
      AmState: 100,
      userID: '',
      loggedIn: true,
      userInfo: 'userInfo'
    }
  }


  handleInputChange = (e, { value }) => this.setState({ AmState: value })

  handlePaginationChange = (e, { AmState }) => this.setState({ AmState })

  handleEffect = (val) => {
    this.setState(prevState => ({
      ...prevState.exponent,
      exponent: val,
    }))
    this.state.synth.set({
      "filterEnvelope": {
        "exponent": val,
      }
    })
  }


  addSound = async () => {
    // console.log('new sound', this.state.name, this.state.AmState)
    console.log('new user', this.props.user)
    const newSound = {
      name: this.state.name,
      setting: Number.parseInt(this.state.AmState),
    }
    await createSound(this.props.user, newSound);
  }


  render() {
    const { AmState } = this.state
    console.log(this.state.name)

    return (
      <React.Fragment>
        <AmSynthControl
          AmState={this.state.AmState} 
          handleEffect={this.handleEffect}
          />
        <div>Bpm {AmState}</div>
        <Input
          min={80}
          max={255}
          onChange={this.handleInputChange}
          type='range'
          value={AmState}
        />
      </React.Fragment>
    )
  }
}
