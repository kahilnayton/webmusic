
import React, { Component } from 'react';
import Tone from 'tone';
import { Button } from 'semantic-ui-react'
import Volume from './Volume'
import ArpeggiatorSlider from './ArpeggiatorSlider'

export default class Arpeggiator extends React.Component {
    constructor() {

        const filter = new Tone.Filter()
        const volume = new Tone.Gain()

        super();
        this.state = {
            // arpeggiator: arpeg,
            volumeLevel:  0.8,
            volume: volume,
            filter: filter,
            presetInfo: {
                description: '',
                category: ''
            },
            volume: 0.8,
            ampEnvelope: {
                attack: 0
            },
            filterEnvelope: {
                attack: 0
            },
            oscType: 'pwm',
        }
    }

    handlePresetChange = (e) => {
        const { target: { name, value }} = e
        this.setState(prevState => ({
            presetInfo: {
                ...prevState.presetInfo,
                [name]: value,
            }
        }))
    }

    handleVolumeKnobChange = (val) => {
        const vol = val / 127 * .8
        this.setState(prevState => ({
            ...prevState.volumeLevel,
            volumeLevel: vol
        }))
        this.state.volume.gain.value = vol
    }

    handleFilterKnobChange = (val) => {
        this.setState(prevState => ({
            ...prevState.filterFrequency,
            filterFrequency: val,
        }))
        this.state.filter.set({
            "frequency": val,
        })
    }

    handleFilterChange = (e) => {
        const {target: {name, value}} = e
        this.setState(prevState => ({
            ...prevState.filterQ,
            filterQ: value
        }))
        this.state.filter.set({
            "Q": [value],
        })
    }

    handleOscModChange = (val) => {
        this.setState(prevState => ({
            ...prevState.oscMod,
            oscMod: val,
        }))
        this.state.synth.set({
            oscillator: {
                modulationFrequency: val,
            }
        })
    }

    componentDidMount() {
        // this.state.arpeggiator.connect(this.state.filter)
        // // this.state.filter.connect(this.state.volume)
        // this.state.volume.toMaster()
        // this.state.filter.frequency.value = 200
        // this.state.volume.gain.value = 0.8
        // this.loadSound()
    }

    start = () => {
        const arpeggiator = new Tone.PolySynth(16, Tone.MonoSynth);
            arpeggiator.set({
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
            })
           
            Tone.context.latencyHint = "fastest"
        let counter = 0
        let loopBeat = new Tone.Loop((time) => {
            if (counter % 4 === 0) {
                arpeggiator.triggerAttackRelease("C3", "2n", time, 1)
            }
            if (counter % 2 === 0) {
                arpeggiator.triggerAttackRelease("E3", "2n", time, this.props.arpeggiatorState)
            }
            if (counter % 6 === 0) {
                arpeggiator.triggerAttackRelease("G3", "2n", time, 1)
            }
            if (counter % 8 === 0) {
                arpeggiator.triggerAttackRelease("D4", "2n", time, this.props.arpeggiatorState)
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
            <div className="arpeggiator">
                <Button inverted color="red"
                    onClick={this.start}>Arpeggiator</Button>
                <Button inverted color="red"
                    onClick={this.stop}>stop</Button>
                <Volume 
                handleSynthFrequency={this.handleSynthFilterFrequency}
                handleFilterEnvAmount={this.handleFilterEnvAmount}
                handleVolume={this.handleVolumeKnobChange}
                />
                <ArpeggiatorSlider 
                // user={userID}
                // login={loggedIn}
                // userInfo={userInfo}
                />
            </div>
        );
    }
}
