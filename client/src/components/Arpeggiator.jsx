
import React, { Component } from 'react';
import Tone from 'tone';
import { Button } from 'semantic-ui-react'
import Volume from './Volume'
import ArpeggiatorControl from './ArpeggiatorControl'
import '../App.css'

export default class Arpeggiator extends React.Component {
    constructor() {
        const synth = new Tone.PolySynth(16, Tone.MonoSynth);
        const filter = new Tone.Filter()
        const volume = new Tone.Gain()

        synth.set({
            "oscillator": {
                "type": "pwm",
                "modulationFrequency": 1,
            },
            "envelope": {
                "attack": 0.001,
                "decay": 5,
                "sustain": 0.1,
                "release": 0.3,
            },
            "filter": {
                "Q": 0,
                "frequency": 200,
                "type": "lowpass",
                "rolloff": -12
            },
            "filterEnvelope": {
                "attack": 0.001,
                "decay": 0.3,
                "sustain": 0.0,
                "release": 2,
                "baseFrequency": 200,
                "octaves": 7,
                "exponent": 2,
            },
        })
        
        Tone.context.latencyHint = "fastest"
        super();
        this.state = {
            selectedPreset: [],
            presetId: '',
            presets: [],
            presetInfo: {
                description: '',
                category: ''
            },

            volumeLevel: 0.8,
            ampEnvelope: {
                attack: 0.001,
                decay: 5,
                sustain: 0.1,
                release: 0.3,
            },
            filterEnvelope: {
                attack: 0.001,
                decay: 5,
                sustain: 0.1,
                release: 0.3,
            },
            oscType: 'pwm',
            oscMod: 1.0001,


            filterType: 'lowpass',
            filterFrequency: 350,
            filterQ: 1,

            isMono: true,
            monoPoly: undefined,
            filterRolloff: -12,
            exponent: 2,
            baseFrequency: 200,
            synthFilterFrequency: 200,
            synthFilterQ: 0,
            synth: synth,
            filter: filter,
            volume: volume,
            midiDevice: '',
        }
    }

    // volume
    handleVolumeKnobChange = (val) => {
        const vol = val / 127 * .8
        this.setState(prevState => ({
            ...prevState.volumeLevel,
            volumeLevel: vol
        }))
        this.state.volume.gain.value = vol
    }

    // global filter cutoff front end change
    handleFilterKnobChange = (val) => {
        this.setState(prevState => ({
            ...prevState.filterFrequency,
            filterFrequency: val,
        }))
        this.state.filter.set({
            "frequency": val,
        })
        // console.log(this.state.filterFrequency)
    }

    //global filter resonance front end change
    handleFilterChange = (e) => {
        const { target: { name, value } } = e
        this.setState(prevState => ({
            ...prevState.filterQ,
            filterQ: value
        }))
        this.state.filter.set({
            "Q": [value],
        })
    }

    loadSound = (e) => {
        let AudioContextFunc = window.AudioContext || window.webkitAudioContext; //storing webMIDI backend callback in an object.
        let audioContext = new AudioContextFunc(); //instantiating webMIDI object to accept device input as a promise
        if (navigator.requestMIDIAccess) { //provides for compatibility check for platform and browser-- google chrome on a mac or pc is really your best bet, here.
            console.log('MIDI supported');
        } else {
            console.log('MIDI not supported')
        };

        const onMIDISuccess = (midiAccess) => { //if successful, will store detected input devices as an object, returning port, manufacturer, device name, device id.

            // console.log(midiAccess);

            //midi inputs/outputs stored in variable in case you connect multiple devices.
            let inputs = midiAccess.inputs;
            let outputs = midiAccess.outputs;

            for (let input of midiAccess.inputs.values()) {
                //capture of midi messages is called here.
                input.onmidimessage = getMIDIMessage;
            }


            midiAccess.onstatechange = function (e) { //when detected device changes will log and attempt to open port for connection
                console.log(e.port)
                e.connection = "open"
                e.state = "connected"
                document.addEventListener("mousedown", function (e) { // clicking mouse anywhere on page will resume autiocontext after automatic suspend due to idle, low power state, sleep, etc.
                    if (audioContext.suspend() || Tone.context.suspend()) {
                        Tone.context.resume()
                        audioContext.resume()
                    }
                })
            }
        }

        const onMIDIFailure = () => { // if navigator.requestMidiAccess fails, it will log an error.
            console.log('Could not access midi devices.')
        }

        const getMIDIMessage = (message) => { //callback function that logs input lines.
            // console.log(message.data);

            //received midi messages are destructured and stored in variables to collect message type, range --and if applicable, a velocity value.
            let command = message.data[0];
            let note = message.data[1];
            let velocity = (message.data.length > 2) ? message.data[2] : 0

            //array of notes in chromatic order to be indexed according to incoming midi note number 1-127.
            let notArray = ["A-2", "A#-2", "B-2", "C-1", "C#-1", "D-1", "D#-1", "E-1", "F-1", "F#-1", "G0", "A-1", "A#-1", "B-1", "C0", "C#0", "D0", "D#0", "E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0", "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1", "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6", "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "B7", "C8", "A8", "A#8", "B8", "C9", "C#9", "D9", "D#9", "E9", "F9", "F#9", "G9", "G#9", "A9", "A#9", "B9", "C10", "C#10", "D10", "D#10", "E10", "F10", "F#10", "G10", "G#10", "A10", "A#10", "B10", "C11", "C#11", "D11", "D#11", "E11", "F11", "F#11", "G11", "G#11",]



            switch (command) {

                case 128:  //noteOff
                    this.state.synth.triggerRelease([notArray[note + 2]])



                    break
                case 144: //noteOn
                    const veloc = velocity * .01
                    // this.state.env.triggerAttackRelease([notArray[note + 2]])

                    this.state.synth.triggerAttack([notArray[note + 2]], this.state.monoPoly, veloc) //can toggle between poly and mono by swapping second undefined argument for null respectively
                    if (velocity > 0) {
                    }
                    break;
                case 176: // CC#11 - Expression Pedal
                    let exp = velocity / 127 * 500.0
                    if (note === 11) {
                        this.state.synth.voices.map(voice => {
                            voice.oscillator.modulationFrequency.value = exp
                        });

                    }
                case 176: // CC#7 - Volume
                    let lev = velocity / 127 * 0.8

                    if (note === 7) {

                        this.state.volume.gain.value = lev
                    }
                case 176: // CC#1 - modulation wheel 
                    let val = velocity / 127 * 14800 + 200;
                    if (note === 1) {
                        this.state.filter.frequency.value = val
                    }
                // There's no break here because sustain and modulation share the same message id, however the cc# is stored in the destructured key stored in the note parameter.

                case 176: // CC#64 - sustain pedal assigned to amp envelope release param

                    let sus = velocity / 127 * 4.0 + 0.01
                    if (note === 64 && velocity === 0) {

                        this.state.synth.voices.map(voice => {
                            voice.envelope.release = this.state.ampEnvelope.release
                            voice.filterEnvelope.release = this.state.filterEnvelope.release

                        });
                    }
                    else if (note === 64) {

                        this.state.synth.voices.forEach(voice => {
                            voice.envelope.release = sus
                            voice.filterEnvelope.release = sus
                        });
                    }
                    break;
                case 224: //pitch bend
                    this.state.synth.voices.map(voice => {
                        // voice.oscillator.frequency.value += velocity
                        voice.oscillator.detune.value = velocity * 2.95
                    });
                    break;
            }
        }
        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    }


    componentDidMount() { //joins instantiated Tone objects, loadSound initializes midi Promise object and other functions that translate incoming midi hardware messages on component render.
        this.state.synth.connect(this.state.filter);
        this.state.filter.connect(this.state.volume);
        this.state.volume.toMaster();
        this.state.filter.frequency.value = 200; // 200 - 15000
        this.state.volume.gain.value = 0.8; // 0-0.8
        this.loadSound()
        // console.log(this.state.synth)
    }


    start = () => {

        Tone.context.latencyHint = "fastest"
        let counter = 0
        let loopBeat = new Tone.Loop((time) => {
            if (counter % 4 === 0) {
                this.arpeggiator.triggerAttackRelease("C3", "2n", time, 1)
            }
            if (counter % 2 === 0) {
                this.arpeggiator.triggerAttackRelease("E3", "2n", time, this.props.arpeggiatorState)
            }
            if (counter % 6 === 0) {
                this.arpeggiator.triggerAttackRelease("G3", "2n", time, 1)
            }
            if (counter % 8 === 0) {
                this.arpeggiator.triggerAttackRelease("D4", "2n", time, this.props.arpeggiatorState)
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
        // console.log(this.props.arpeggiatorState)
        return (
            <div className="arpeggiator">
                <Button inverted color="red"
                    onClick={this.start}>Arpeggiator</Button>
                <Button inverted color="red"
                    onClick={this.stop}>stop</Button>
                <Volume
                    handleSynthFilterFrequency={this.handleSynthFilterFrequency}
                    handleFilterEnvAmount={this.handleFilterEnvAmount}
                    handleVolume={this.handleVolumeKnobChange}
                  />
                <ArpeggiatorControl
                />
                
            </div>
        );
    }
}
