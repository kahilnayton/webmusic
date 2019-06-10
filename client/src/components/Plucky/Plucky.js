
import React, { Component } from 'react';
import Tone from 'tone';
import PluckySlider from './PluckySlider'
import { Button } from 'semantic-ui-react'

class PolyMachine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            synth: null
        }
    }

    start = () => {
        let counter = 0
        let plucky = new Tone.PluckSynth().toMaster()
        let bassSynth = new Tone.MembraneSynth().toMaster()
        let fmSynth = new Tone.FMSynth().toMaster()

        let loopBeat = new Tone.Loop((time) => {
            if (counter % 4 === 0) {
                plucky.triggerAttackRelease("D1", "2n", time, 1)

            }
            if (counter % 2 === 0) {
                bassSynth.triggerAttackRelease("D1", "2n", time, 1)
            }
            if (counter % 8 === 0) {
                fmSynth.triggerAttackRelease("D1", "2n", time, 1)
            }
            counter = (counter + 1) % 16
        })
        Tone.Transport.start(0);
        loopBeat.start(0)
        Tone.Transport.bpm.value = this.props.pluckyState

    }
    render = () => {
        console.log(this.props.pluckyState)
        return (
            <div className="App">
                <Button inverted color="purple"
                    onClick={this.start}>Plucky</Button>
            </div>
        );
    }
}

export default PolyMachine;