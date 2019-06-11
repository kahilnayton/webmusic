import React, { Component } from 'react'
import { Button, Input, Icon } from 'semantic-ui-react'
import TangoMachine from './TangoMachine'
import {createSound} from '../../service/index'

export default class TangoSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Tango',
      tangoState: 1,
      userID: '',
      loggedIn: true,
      userInfo: 'userInfo'
    }
  }

  state = { tangoState: 100 }

  handleInputChange = (e, { value }) => this.setState({ tangoState: value })

  handlePaginationChange = (e, { tangoState }) => this.setState({ tangoState })

  addSound = async () => {
    // console.log('new sound', this.state.name, this.state.machineState)
    console.log('new tango', this.props.user)
    const newSound = {
      name: this.state.name,
      setting: Number.parseInt(this.state.tangoState),
    }
    await createSound(this.props.user, newSound);
  }


  render() {
    const { tangoState } = this.state

    return (
      <React.Fragment>


        <TangoMachine
          tangoState={this.state.tangoState} />
        <div>Bpm {tangoState}</div>
        <Input
          min={100}
          max={400}
          onChange={this.handleInputChange}
          type='range'
          value={tangoState}
        />

        <Button onClick={() => this.addSound()}>
          <i aria-hidden="true" class="like link heart outline icon"></i>

        </Button>

      </React.Fragment>
    )
  }
}
