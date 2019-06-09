import React, { Component } from 'react'
import { Grid, Input, Segment, Icon } from 'semantic-ui-react'
import PolyMachine from './PolyMachine'

export default class PolySlider extends Component {
  state = { polyState: 1 }

  handleInputChange = (e, { value }) => this.setState({ polyState: value })

  handlePaginationChange = (e, { polyState }) => this.setState({ polyState })

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
              
          <i aria-hidden="true" class="like link heart outline icon"></i>
           
      </React.Fragment>
    )
  }
}
