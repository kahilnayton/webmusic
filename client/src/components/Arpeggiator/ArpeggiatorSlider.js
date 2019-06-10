import React, { Component } from 'react'
import { Button, Input, Icon } from 'semantic-ui-react'
import Arpeggiator from './Arpeggiator'
import { createSound } from '../../service/index'

export default class ArpeggiatorSlider extends Component {
    state = { arpeggiatorState: 0 }

    handleInputChange = (e, { value }) => this.setState({ arpeggiatorState: value })

    handlePaginationChange = (e, { arpeggiatorState }) => this.setState({ arpeggiatorState })


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
                <div>Saw {arpeggiatorState}</div>
                <Input
                    min={0}
                    max={10}
                    onChange={this.handleInputChange}
                    type='range'
                    value={arpeggiatorState}
                />

                <Button onClick={() => this.addSound()}>
                    <i aria-hidden="true" class="like link heart outline icon"></i>

                </Button>

            </React.Fragment>
        )
    }
}
