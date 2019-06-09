import React, { Component } from 'react'
import { Grid, Input, Pagination, Segment, Icon } from 'semantic-ui-react'
import Machine from './Machine'

export default class MachineSlider extends Component {
  state = { machineState: 1 }

  handleInputChange = (e, { value }) => this.setState({ machineState: value })

  handlePaginationChange = (e, { machineState }) => this.setState({ machineState })

  render() {
    const { machineState } = this.state

    const IconExampleLink = () => (
      <div>
        <Icon link name='like' />
      </div>
    )


    // console.log(this.state.machineState)

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
              
          <i aria-hidden="true" class="like link heart outline icon"></i>
           
      </React.Fragment>
    )
  }
}
