import React, { Component } from 'react'
import { Button, Input, Segment, Icon } from 'semantic-ui-react'
// import {createSound} from '../service/index'
import Plucky from './Plucky'

export default class PluckySlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Plucky',
      pluckyState: 1,
      userID: '',
      loggedIn: true,
      userInfo: 'userInfo'
    }
  }


  handleInputChange = (e, { value }) => this.setState({ pluckyState: value })

  handlePaginationChange = (e, { pluckyState }) => this.setState({ pluckyState })

  // addSound = async () => {
  //   // console.log('new sound', this.state.name, this.state.machineState)
  //   console.log('new pluck', this.props.user)
  //   const newSound = {
  //     name: this.state.name,
  //     setting: Number.parseInt(this.state.pluckyState),
  //   }
  //   await createSound(this.props.user, newSound);
  // }

  render() {
    const { pluckyState } = this.state


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
