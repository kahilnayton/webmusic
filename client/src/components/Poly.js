
import React, { Component } from 'react';
import Tone from 'tone';
import Slider from './PolySlider'
import { Button, Checkbox, Form, Divider, Grid, Segment } from 'semantic-ui-react'

class Poly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            synth: null,
            isPlaying: false
        }
    }

    start = () => {
        let counter = 0
        Tone.start();
        let poly = new Tone.PolySynth({
            "oscillator": {
                "type": "pwm",
                "modulationFrequency": 1
            },
            "envelope": {
                "attack": 1,
                "decay": 0.1,
                "sustain": 0.2,
                "release": 0.1,
            },

        }).toMaster();

        let loopBeat = new Tone.Loop((time) => {
            if (counter % 2 === 0) {
                poly.triggerAttackRelease("D3", "8n", time, 1)

            }
            counter = (counter + 1) % 16
        })
        Tone.Transport.start(0);
        loopBeat.start(0)
        Tone.Transport.bpm.value = 100


    }

    stop = () => {
        Tone.Transport.stop()
    }


    render = () => {
        console.log(this.props.polyState)
        return (
            <div className="App">
                <Button inverted color="red"
                    onClick={this.start}>PolySynth</Button>

                <Button inverted color="red"
                    onClick={this.stop}>stop</Button>

            </div>
        );
    }
}

export default Poly;