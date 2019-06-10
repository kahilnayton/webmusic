import React, { Component } from 'react'
import { Button, Input, Segment, Icon } from 'semantic-ui-react'
import {createSound} from '../../service/index'
import PolyMachine from './PolyMachine'

export default class PolySlider extends Component {
  state = { polyState: 1 }

  handleInputChange = (e, { value }) => this.setState({ polyState: value })

  handlePaginationChange = (e, { polyState }) => this.setState({ polyState })

  addSound = async () => {
    // console.log('new sound', this.state.name, this.state.machineState)
    console.log('new user', this.props.user)
    const newSound = {
      name: this.state.name,
      setting: Number.parseInt(this.state.machineState),
    }
    await createSound(this.props.user, newSound);
  }

  render() {
    const { polyState } = this.state

    const IconExampleLink = () => (
      <div>
        <Icon link name='like' />
      </div>
    )


    // console.log(this.state.polyState)

    return (
      <React.Fragment>



        <PolyMachine
          polyState={this.state.polyState} />
        <div>Effect {polyState}</div>
        <Input
          min={0}
          max={255}
          onChange={this.handleInputChange}
          type='range'
          value={polyState}
        />

        <Button onClick={() => this.addSound()}>
          <i aria-hidden="true" class="like link heart outline icon"></i>

        </Button>

      </React.Fragment>
    )
  }
}
