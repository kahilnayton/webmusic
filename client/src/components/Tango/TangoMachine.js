import React, { Component } from 'react';
import Tone from 'tone'
import { Button } from 'semantic-ui-react'



class TangoMachine extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
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
            harmonicity: 1.1,
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
            if (counter % 4 === 0) {
                fmSynth.triggerAttackRelease("D1", '8n', time, 1)

            }
            if (counter % 2 === 0) {
                amSynth.triggerAttackRelease("c2", "4n", time, 1)
            }
            counter = (counter + 1) % 16
        })
        Tone.Transport.start(0);
        loopBeat.start(0)
        Tone.Transport.bpm.value = this.props.tangoState
    }

    stop = () => {
        Tone.Transport.stop(0)
    }


    render = () => {
        console.log(this.props.tangoState)

        const isPlaying = this.state.isPLaying
        return (
            <div>
                <Button inverted color="blue"
                    onClick={this.start}>Tango</Button>

                <Button inverted color="blue"
                    onClick={this.stop}>stop</Button>


            </div>
        );
    }
}
export default TangoMachine;