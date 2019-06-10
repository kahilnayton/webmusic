import React, { Component } from 'react'
import { Input, Icon, Button } from 'semantic-ui-react'
import Machine from './Machine'

export default class MachineSlider extends Component {
  constructor() {
    super()
    this.state = {
      name: 'Machine',
      machineState: 1,
      userID: 2,
      loggedIn: true,
      userInfo: 'userInfo'
    }
  }


  handleInputChange = (e, { value }) => this.setState({ machineState: value })

  handlePaginationChange = (e, { machineState }) => this.setState({ machineState })


  addSound = async () => {
    console.log('new sound', this.state.name, this.state.machineState)
    const newSound = {
      name: this.state.name,
      setting: Number.parseInt(this.state.machineState),
    }
    // await createSound(this.props.user, newSound);
  }


  render() {
    const { machineState } = this.state
    console.log(this.state.name)

    return (
      <React.Fragment>



        <Machine
          machineState={this.state.machineState} />
        <div>Effect {machineState}</div>
        <Input
          min={0}
          max={255}
          onChange={this.handleInputChange}
          type='range'
          value={machineState}
        />

        <Button onClick={() => this.addSound()}>
          <i aria-hidden="true" class="like link heart outline icon"></i>

        </Button>




      </React.Fragment>
    )
  }
}
