import React, { Component } from 'react';
import Tone from 'tone'
import { Button, Segment } from 'semantic-ui-react'
import AmSynthKnob from './AmSynthKnob'


class Am extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soundName: 'Am',
            userID: '',
            loggedIn: true,
            userInfo: ''
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



        let loopBeat = new Tone.Loop((time) => {
            if (counter % 2 === 0) {
                amSynth.triggerAttackRelease("A2", "8n", time, 1)

            }
            if (counter % 2 === 0) {
                amSynth.triggerAttackRelease("C2", "16n", time, 1)

            }
            if (counter % 4 === 0) {
                amSynth.triggerAttackRelease("B2", "1m", time, 1)
            }
            counter = (counter + 1) % 16
        })

        Tone.Transport.start(0);

        loopBeat.start(0)
        Tone.Transport.bpm.value = this.props.AmState
    }

    stop = () => {
        Tone.Transport.stop()
    }

    render = () => {
        console.log(this.props.AmState)

        const isPlaying = this.state.isPLaying
        return (
            <div>
                <Button inverted color="green"
                    onClick={this.start}>Am</Button>

                <Button inverted color="green"
                    onClick={this.stop}>stop</Button>

                    <AmSynthKnob />

            </div>
        );
    }
}
export default Am;