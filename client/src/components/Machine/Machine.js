import React, { Component } from 'react';
import Tone from 'tone'
import Slider from './MachineSlider'
import { Button, Checkbox, Form, Divider, Grid, Segment } from 'semantic-ui-react'



class Machine extends Component {
	constructor(props) {
		super(props);
        this.state = {
			// beat: null,
            // isPLaying: false
        }
        // handleStopClick = () => {
			//  Tone.stop()
			//  this.state({ isPLaying: false })
			//  console.log(this.isPLaying, 'nothing to stop')
			// }
			console.log(this.props)
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
		
       let plucky = new Tone.PluckSynth().toMaster()
    //    let fmSynth = new Tone.FMSynth().toMaster()
       let bassSynth = new Tone.MembraneSynth().toMaster()
       let cymbalSynth = new Tone.MetalSynth({
            frequency: 200,
            envelope: {
                attack: 0.001,
                decay: 0.1,
                release: 0.01
            },
            harmonicity: 3.1,
            modulationIndex: 32,
            resonance: this.props.activePage, 
            octaves: 1.5
        }).toMaster()
		
		// let counter = 0

		let loopBeat = new Tone.Loop((time) => { 
			fmSynth.triggerAttackRelease("D1", "8n")  
			fmSynth.triggerAttackRelease("D2", "4n", time)  
		
		})
	
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