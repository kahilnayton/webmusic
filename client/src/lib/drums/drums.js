import Tone from 'tone';
import audioSettings from './audioSettings';

// Tone.Transport.bpm.value = 90;

let drumsSamples

export default drumsSamples = new Tone.Sampler({

      "C3" : "samples/MVKick06.wav",
      "D#3" : "samples/MVClap01.wav",
      "F#3" : "samples/MVHat01_C.wav",
      
    }, function() {

    
    Tone.sampler.triggerAttack("D#3")
    console.log("D#3")
    
})


