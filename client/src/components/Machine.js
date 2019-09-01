import React, { Component } from 'react';
import Tone from 'tone'
import Slider from './MachineSlider'
import { Button } from 'semantic-ui-react'



class Machine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soundName: 'Machine'

        }

        console.log(this.props)

    }
    start = () => {
        let counter = 0
        let amSynth = new Tone.AMSynth({
            harmonicity: 5 / 1,
            detune: 0,
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.01,
                decay: 0.01,
                sustain: 1,
                release: 0.5
            },
            modulation: {
                type: "square"
            },
            modulationEnvelope: {
                attack: 0.5,
                decay: 0,
                sustain: 1,
                release: 0.5
            }
        }
        ).toMaster()


        let fmSynth = new Tone.FMSynth({
            harmonicity: 1.1, // mod synth / carier synth
            modulationIndex: 20,
            detune: 0,
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.01,
                decay: 0.01,
                sustain: 1,
                release: 0.5
            },
            modulation: {
                type: "square"
            },
            modulationEnvelope: {
                attack: 0.5,
                decay: 0,
                sustain: 1,
                release: 0.5
            }
        }
        ).toMaster()




        let cymbalSynth = new Tone.MetalSynth({
            frequency: 200,
            envelope: {
                attack: 0.001,
                decay: 0.1,
                release: 0.01
            },
            harmonicity: 3.1,
            modulationIndex: 32,
            resonance: this.props.machineState,
            octaves: 1.5
        }).toMaster()

        // let counter = 0

        let loopBeat = new Tone.Loop((time) => {
            if (counter % 4 === 0) {
                fmSynth.triggerAttackRelease("D1", "8n", time, 1)

            }
            if (counter % 2 === 0) {
                cymbalSynth.triggerAttackRelease("D2", "4n", time)
            }
            counter = (counter + 1) % 16
        })

        Tone.Transport.start(0);

        loopBeat.start(0)
    }

    stop = () => {
        Tone.Transport.stop()
    }



    render = () => {
        // console.log(this.props.machineState)

        const isPlaying = this.state.isPLaying
        // let button
        return (
            <div>
                <Button inverted color="green"
                    onClick={this.start}>Machine</Button>

                <Button inverted color="green"
                    onClick={this.stop}>stop</Button>

            </div>
        );
    }
}
export default Machine;