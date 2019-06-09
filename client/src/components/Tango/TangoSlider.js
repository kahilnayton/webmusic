import React, { Component } from 'react'
import { Grid, Input, Pagination, Segment, Icon } from 'semantic-ui-react'
import TangoMachine from './TangoMachine'

export default class TangoSlider extends Component {
  state = { activePage: 1 }

  handleInputChange = (e, { value }) => this.setState({ activePage: value })

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  render() {
    const { activePage } = this.state

    const IconExampleLink = () => (
      <div>
        <Icon link name='like' />
      </div>
    )


    // console.log(this.state.activePage)

    return (
      <React.Fragment>


        <Grid columns={3} verticalAlign='middle'>
          <Grid.Column>
            <Segment secondary>
        <TangoMachine
          activePage={this.state.activePage} />
              <div>Effect {activePage}</div>
              <Input
                min={0}
                max={255}
                onChange={this.handleInputChange}
                type='range'
                value={activePage}
              />
              
          <i aria-hidden="true" class="like link heart outline icon"></i>
            </Segment>

          </Grid.Column>
       
        </Grid>
      </React.Fragment>
    )
  }
}
