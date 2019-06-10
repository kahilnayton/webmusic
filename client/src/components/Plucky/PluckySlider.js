import React, { Component } from 'react'
import { Button, Input, Segment, Icon } from 'semantic-ui-react'
import {createSound} from '../../service/index'
import Plucky from './Plucky'

export default class PluckySlider extends Component {
  state = { pluckyState: 1 }

  handleInputChange = (e, { value }) => this.setState({ pluckyState: value })

  handlePaginationChange = (e, { pluckyState }) => this.setState({ pluckyState })

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
    const { pluckyState } = this.state

   

    // console.log(this.state.pluckyState)

    return (
      <React.Fragment>



        <Plucky
          pluckyState={this.state.pluckyState} />
        <div>Pluck {pluckyState}</div>
        <Input
          min={0}
          max={255}
          onChange={this.handleInputChange}
          type='range'
          value={pluckyState}
        />

        <Button onClick={() => this.addSound()}>
          <i aria-hidden="true" class="like link heart outline icon"></i>

        </Button>

      </React.Fragment>
    )
  }
}
