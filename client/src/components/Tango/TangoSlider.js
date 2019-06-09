import React, { Component } from 'react'
import { Grid, Input, Pagination, Segment, Icon } from 'semantic-ui-react'
import TangoMachine from './TangoMachine'

export default class TangoSlider extends Component {
  state = { tangoState: 100 }

  handleInputChange = (e, { value }) => this.setState({ tangoState: value })

  handlePaginationChange = (e, { tangoState }) => this.setState({ tangoState })

  render() {
    const { tangoState } = this.state

    const IconExampleLink = () => (
      <div>
        <Icon link name='like' />
      </div>
    )


    // console.log(this.state.tangoState)

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
              
          <i aria-hidden="true" class="like link heart outline icon"></i>
           
      </React.Fragment>
    )
  }
}
