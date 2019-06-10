
import React, { Component } from 'react';
import Tone from 'tone';
import { Button } from 'semantic-ui-react'

class Arpeggiator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Arpeggiator: Arpeggiator
        }
    }

    start = () => {
        let counter = 0
        let polySynth = new Tone.PolySynth({
            oscillator: {
                type: "pwm",
                modulationFrequency: 1
            },
            envelope: {
                attack: 0.1,
                decay: 0.1,
                sustain: 0.2,
                release: 0.1,
            },

        }).toMaster();

        let loopBeat = new Tone.Loop((time) => {
            if (counter % 4 === 0) {
                polySynth.triggerAttackRelease("C3", "2n", time, 1)

            }
            if (counter % 2 === 0) {
                polySynth.triggerAttackRelease("E3", "2n", time, this.props.arpeggiatorState)
            }
            if (counter % 6 === 0) {
                polySynth.triggerAttackRelease("G3", "2n", time, 1)
            }
            if (counter % 8 === 0) {
                polySynth.triggerAttackRelease("D4", "2n", time, this.props.arpeggiatorState)
            }
            counter = (counter + 1) % 16
        })
        Tone.Transport.start(0);
        loopBeat.start(0)
        Tone.Transport.bpm.value = 100

    }

    stop = () => {
        Tone.Transport.stop(0)
    }

    render = () => {
        console.log(this.props.arpeggiatorState)
        return (
            <div className="App">
                <Button inverted color="red"
                    onClick={this.start}>Arpeggiator</Button>
                <Button inverted color="red"
                    onClick={this.stop}>stop</Button>
            </div>
        );
    }
}

export default Arpeggiator;