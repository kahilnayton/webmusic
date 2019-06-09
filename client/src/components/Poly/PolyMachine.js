
import React, { Component } from 'react';
import Tone from 'tone';
import Slider from './PolySlider'
import { Button, Checkbox, Form, Divider, Grid, Segment } from 'semantic-ui-react'

class PolyMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      synth: null
    }
  }

  start = () => {
    Tone.start();
    let synth = new Tone.PolySynth({
	"oscillator" : {
		"type" : "pwm",
		"modulationFrequency" : 20
	},
	"envelope" : {
		"attack" : 1,
		"decay" : 0.1,
		"sustain" : 0.2,
		"release" : 0.1,
    },
    
    }).toMaster();
    synth.triggerAttackRelease("D3", "8n");
    

  }
  render = () => {
    console.log(this.props.polyState)
    return (
      <div className="App">
        	<Button inverted color="red"
              onClick={this.start}>PolySynth</Button>
      </div>
    );
  }
}

export default PolyMachine;