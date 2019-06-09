import React, { Component } from 'react';
import Tone from 'tone'

import { Button, Checkbox, Form, Divider, Grid, Segment } from 'semantic-ui-react'



class Machine extends Component {
	constructor() {
        super();
        this.state = {
            // beat: null,
            // isPLaying: false
        }
        // handleStopClick = () => {
        //  Tone.stop()
        //  this.state({ isPLaying: false })
        //  console.log(this.isPLaying, 'nothing to stop')
        // }
        // handleStartClick = () => {
        //  // Tone.stop()
        //  this.state({ isPLaying: true })
        //  console.log(this.isPLaying, 'nothing to stop')
        // }
    }
    start = () => {
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
            modulationIndex: 10,
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
		
       let plucky = new Tone.PluckSynth().toMaster()
    //    let fmSynth = new Tone.FMSynth().toMaster()
       let bassSynth = new Tone.MembraneSynth().toMaster()
       let cymbalSynth = new Tone.MetalSynth({
            frequency: 250,
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
		
		// let counter = 0

		let loopBeat = new Tone.Loop((time) => { 
			amSynth.triggerAttackRelease("D3", "8n")  })

    //         if (counter % 4 === 0) {
    //             bassSynth.triggerAttackRelease('c1', '8n', time, 1)
    //         }
    //         if (counter % 4 !== 1) {
    //             if (counter === 3 || counter === 12) {
    //                 cymbalSynth.envelope.decay = 0.5
    //             } else {
    //                 cymbalSynth.envelope.decay = 0.01
    //             }
    //             cymbalSynth.triggerAttackRelease('c1', '16n', time, 0.3)
    //         }
    //         counter = (counter + 1) % 16
    //     }
    //     if (counter === 0) {
    //         amSynth.triggerAttackRelease('a1', '16n', Tone.Time('4n'), 0.8)
    //     }
    //     if (counter === 10) {
    //         amSynth.triggerAttackRelease('Bb1', '16n', Tone.Time('4n'), 0.8)
    //     }
    //     if (counter === 0) {
    //         fmSynth.triggerAttackRelease('a2', '16n', Tone.Time('4n'), 0.8)
    //     }
    //     if (counter === 10) {
    //         fmSynth.triggerAttackRelease('Bb2', '16n', Tone.Time('4n'), 0.8)
    //     }
    //     if (counter % 2 === 0) {
    //         plucky.triggerAttackRelease('b6', '16n', Tone.Time('4n'), 0.4)
    //     } else {
    //         plucky.triggerAttackRelease('g#6', '16n', Tone.Time('4n'), 0.4)
    //     }
    //     // this.setState({
    //     //     isPlaying: true
    //     });
	// 	// console.log('isplaying', this.isPlaying)
		
	
	

		Tone.Transport.start(0);
        loopBeat.start(0)
    }
    
	

    render = () => {
        const isPlaying = this.state.isPLaying
        // let button
        return (
            <div>

				<Button inverted color="green"
              onClick={this.start}>Machine</Button>


                {/* {isPlaying ? (
                    <PlayButton onClick={this.start} />
                ) : (
                        <StopButton onClick={this.handleStopClick} />
                    )} */}
            </div>
        );
    }
}
export default Machine;