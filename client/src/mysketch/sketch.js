
let loopBeat
let bassSynth, cymbalSynth
let counter
let amSynth
let fmSynth
let plucky

function setup() {

	counter = 0
	amSynth = new Tone.AMSynth({
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

	fmSynth = new Tone.FMSynth({
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

	plucky = new Tone.PluckSynth().toMaster()
	fmSynth = new Tone.FMSynth().toMaster()
	bassSynth = new Tone.MembraneSynth().toMaster()
	cymbalSynth = new Tone.MetalSynth({

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
	loopBeat = new Tone.Loop(song, '16n').start(0)
	Tone.Transport.start().bpm.value = 140
}

function song(time) {
	if (counter % 4 === 0) {
		bassSynth.triggerAttackRelease('c1', '8n', time, 1)

	}
	if (counter % 4 !== 1) {
		if (counter === 3 || counter === 12) {
			cymbalSynth.envelope.decay = 0.5
		} else {
			cymbalSynth.envelope.decay = 0.01
		}
		cymbalSynth.triggerAttackRelease('16', time, 0.3)
	}
	counter = (counter + 1) % 16
}

if (counter === 0) {
	amSynth.triggerAttackRelease('a1', '16n', time, 0.8)
}
if (counter === 10) {
	amSynth.triggerAttackRelease('Bb1', '16n', time, 0.8)
}
if (counter === 0) {
	fmSynth.triggerAttackRelease('a2', '16n', time, 0.8)
}
if (counter === 10) {
	fmSynth.triggerAttackRelease('Bb2', '16n', time, 0.8)
}
// if (counter % 2 === 0) {
// 	plucky.triggerAttack('b6', '16n', time, 0.4)
// } else {
// 	plucky.triggerAttack('g#6', '16n', time, 0.4)

// }
