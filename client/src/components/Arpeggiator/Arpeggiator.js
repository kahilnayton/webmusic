
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
                modulationFrequency: 20
            },
            envelope: {
                attack: 1,
                decay: 0.1,
                sustain: 0.2,
                release: 0.1,
            },

        }).toMaster();

        let loopBeat = new Tone.Loop((time) => {
            if (counter % 4 === 0) {
                polySynth.triggerAttackRelease(["C4", "E4", "A4"], "4n")

            }
            if (counter % 2 === 0) {
                polySynth.triggerAttackRelease("D1", "2n", time, 1)
            }
            counter = (counter + 1) % 16
        })
        Tone.Transport.start(0);
        loopBeat.start(0)
        Tone.Transport.bpm.value = this.props.arpeggiatorState

    }
    render = () => {
        console.log(this.props.arpeggiatorState)
        return (
            <div className="App">
                <Button inverted color="red"
                    onClick={this.start}>Arpeggiator</Button>
            </div>
        );
    }
}

export default Arpeggiator;