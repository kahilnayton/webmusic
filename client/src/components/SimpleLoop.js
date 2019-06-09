import React, { Component } from 'react';
import { Button, Grid, Input, Pagination, Segment } from 'semantic-ui-react'
import Tone from 'tone'


class SimpleLoop extends Component {
    state = { activePage: 1 }

    handleInputChange = (e, { value }) => this.setState({ loopOne: value })


    handlePaginationChange = (e, { loopOne }) => this.setState({ loopOne })

    start = () => {
        // let bassSynth = new Tone.MembraneSynth().toMaster()
        let cymbalSynth = new Tone.MetalSynth({
            frequency: this.props, // trying to do something like {this.activePage}
            envelope: {
                attack: 0.001,
                decay: 0.1,
                release: 0.01
            },
            harmonicity: 3.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1.5
        }).toMaster()
        let loopBeat = new Tone.Loop((time) => {
            // bassSynth.triggerAttackRelease('c1', '8n', time)
            cymbalSynth.triggerAttackRelease('c1', '8n', time)
        })

        Tone.Transport.start(0);
        loopBeat.start(0)
    }


    // song = (time) => {
    //     console.log(time)
    // }


    render() {
        console.log(this.activePage) // this console logs the slider value 
        const { loopOne } = this.state

        return (
            <Grid columns={2} verticalAlign='middle'>
                <Grid.Column>
                <Button inverted color="green"
              onClick={this.start}>Simple Loop</Button>


                    <Segment secondary>
                        <div>loopOne: {loopOne}</div>
                        <Input
                            min={0}
                            max={250}
                            onChange={this.handleInputChange}
                            type='range'
                            value={loopOne}
                        />
                    </Segment>
                </Grid.Column>

            </Grid>
        )
    }
}

export default SimpleLoop