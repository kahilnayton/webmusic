import React, { Component } from 'react'
import { Grid, Input, Segment, Icon } from 'semantic-ui-react'
import Arpeggiator from './Arpeggiator'

export default class ArpeggiatorSlider extends Component {
  state = { arpeggiatorState: 100 }

  handleInputChange = (e, { value }) => this.setState({ arpeggiatorState: value })

  handlePaginationChange = (e, { arpeggiatorState }) => this.setState({ arpeggiatorState })

  render() {
    const { arpeggiatorState } = this.state

    const IconExampleLink = () => (
      <div>
        <Icon link name='like' />
      </div>
    )


    // console.log(this.state.arpeggiatorState)

    return (
      <React.Fragment>

        <Arpeggiator
          arpeggiatorState={this.state.arpeggiatorState} />
              <div>Bpm {arpeggiatorState}</div>
              <Input
                min={0}
                max={255}
                onChange={this.handleInputChange}
                type='range'
                value={arpeggiatorState}
              />
              
          <i aria-hidden="true" class="like link heart outline icon"></i>
           
      </React.Fragment>
    )
  }
}
