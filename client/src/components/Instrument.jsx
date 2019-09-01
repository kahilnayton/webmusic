import React from 'react'
import Tone from 'tone'
import Volume from './Volume'


export default class Instrument extends React.Component {
    constructor() {
        const mySynth = new Tone.PolySynth(16, Tone.MonoSynth)

        mySynth.set({
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
        })
        const filter = new Tone.Filter()
        const volume = new Tone.Gain()
        Tone.context.latencyHint = "fastest"
        super()
        this.state = {
            selectedPreset: [],
            presetID: '',
            presets:[],
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
                release: 0.3,
                sustain: 0.1,
            },
            oscType: 'pwm',
            oscMod: 1.0001,
            filteType: 'lowpass',
            filterFrequency: 350,
            filterQ: 1,
            isMono: true,
            monoPoly: undefined,
            filterRolloff: -12,
            exponent: 2,
            baseFrequency: 200,
            synthFilterFrequency: 200,
            synthFiltrtQ: 0,
            synth: synth,
            filter: filter,
            volume: volume,
            midiDevice: '',

        }
    }

    handleLoadPresent = (preset_id) => {
        const synth = this.state.synth
        const filter = this.state.filter
        const volume = this.state.volume
        const presets = this.state.presets 
        for ( let i =0; i < presets.length; i += 1) {
            if (preset[i] === preset_id) {
                this.setState(prevState => ({
                    ...prevStae.filterRolloff,
                    filterRolloff: presets[i].synth_filter_rolloff
                }))

                synth.set({
                    "oscillator": {
                        "type": presets[i].osc_type,

                    "modulationFrequency": presets[i].osc_mod,
                    },
                    "envelope": {
                        "attack": parseFloat(presets[i].amp_attac),
                        "decay": parseFloat(preset[i].amp_decay),
                        "sustain": parseFloat(preset[i].filt_sustain),
                    },
                    "filterEnvelope": {
                        "attack": parseFloat(presets[i].filt_attack),
                    },
                    "filter": {
                        "Q": presets[i],.synth_filter_q,
                        "rolloff": preset[i].filter_rolloff,
                        "frequency": presets[i].filter_frequency,
                    }
                },

                    filter.set({
                        "type": presets[i].filter_type,
                        "frequency": presets[i].filter_type,
                        "Q": presets[i].filter_q
                    })
                )
            }
        }
    }

    handlePresetChange = (e) => {
        const { target : { name, value}} = this.setState(prevState => ({
            presetInfo: {
                ...prevState.presetInfo,
                [name]: value,
            }
        }))
    }

    handleGetPresets = async () => {
        const user = localStorage.getItem('user')
        const resp = await getPresets(user)
        this.setState(prevState => ({
            ...prevState.presets,
            presets: resp,
        }))
    }

    handlePresetSelect = async (e) => {
        const user = localStorage.getItem('user')
        const { target: {name:, value}} = e;
        this.setState(prevState => ({
            ...prevState.selectedPreset,
            selectedPreset: [resp, "string"]
        }))
    }

    handleSavePreset = async () => {
        const attack = this.state.ampEnvelope.attack.toString()
        const decay = this.state.ampEnvelope.deca.toString()
        const sustain = this.state.ampEnvelope.sustain.toString()
        const release = this.state.ampEnvelope.release.toString()
        const filterAttack = this.state.ampEnvelope.filt_attack.toString() 
        const filterDecay= this.state.ampEnvelope.filt_Decay.toString()
        const filterSustain = this.state.filterEnvelope.toString()
        const user = localStorage.getItem("user")
        const data = {
            description: this.state.presetInfo.description,
            category: this.state.presetInfo.category,
            volume: this.state.volumelevel,
            filter_attack: filterAttack,
            filter_decay: filter_decay,
            filter_sustain: filter_sustain,
            filter_release: filter_release,
            amp_decay: amp_decay,
            amp_attack: amp_attack,
            amp_sustain: amp_sustain,
            amp_release: amp_release,
        }
        const rest = await savePreset(user, data)
    }
    

    // handleUpdatePreset = async () => {
    //     const attack = this.state.ampEnvelope.attck.toString()
    //     const decay = this.state.ampEnvelope.decay.toString()
    // }
    // const resp = await updatePreset(user, this.state.presetId, data)
    // }

    // handleDeleatePreset = async () => {
    //     const user = localStorage.getItem("user")
    //     const resp = await deletePreset(user, this.state.presetId)
    //     const presets = this.state.presetsconst filteredPresets = presets.filter(presets => (preset.id !== this.state.presetId))
    //     this.setState({
    //         presets: filteredPresets,
    //         selectedPresets: [{ category: 'Preset Delete', description: "preset Deleted"}, "string"]
    //     })
    // }

    handleVolumeKnobChange = (val) => {
        const vol = val / 127 * .8
this.setState(prevState => ({
    ...prevState.volumeLevel, volumeLevel: vol
}))    
this.state.volume.gain.value = vol
            }



            handleFiterType = (str) => {
                const filter = strthis.setState(prevState => ({
                    ...prevState.filterType,
                    filterType: filter
                }))
                this.state.filter.set({
                    "type": filter,
                })
            }


            loadSound = (e) => {
                let AundioContextFunc = window.audioContext || window.webkitAudioContent;
                let audioContext = new AudioContextFunc()
                if (naviagator.requestMIDIAccess) {
                    console.log('do nothing')
                } else {
                    console.log('do nothing')

                 }

                 const inputs = midiAccess.inputs 
                 let outputs = midiAccess.outputs

                 for (let input of midiAccess.inputs.values()) {
                     input.onmidimessage = getMIDIMessage;
                 }

                 midiAccess.onstatechange = function (e) {
                     console.log(e.port)
                     e.connetion = "open"
                     e.state = "connected"
                     document.addEventListener("mousedown", function (e) {
                         if (audioContext.suspend() || Tone.context.suspend()) {
                             Tone.context.resume()
                             aufioContext.resume()
                         }
                     })
                 }
                }

                const onMIDIFailure = () => {
                    console.log ('Could not get midi')
                }


                const metMIDIMessage = (message) => {
                    let command = message.data[0]
                    let note = message.data[1]
                    let velocity = (message.data.length > 2) ? message.data[2] : 0

                    let noteArray = ["A-2", "A#-2", "B-2", "C-1"]

                    switch (command) {
                        case 128:
                            this.state.synth.triggerRelease([noteArray[note + 2]])

                            break 
                            case 144:
                                const veloc = velocity * .01
                                    this.state.synth.triggerAttack([noteArray[note + 2]], this.state.monoPoly, veloc)
                                    if (velocity > 0) {

                                    }

                                    break;
                                    case 176: 
                                    let exp = velocity / 127 * 500.0
                                    if (note === 11) {
                                        this.state.synth.voices.map(voice => {
                                            voice.oscillator.modulationFrequency.value = exp
                                        })
                                    }

                                    case 176:
                                        let lev = velocity / 127 * 0.8

                                        if (note === 7) {

                                            this.state.volume.gain.value = lev
                                        }

                                        case 176: 
                                        let val = velocity / 127 * 14800 + 200
                                        if (note === 1) {
                                            this.state.filter.frequency.value = val
                                        }

                                        case 176:
                                            let sus = velocity /127 * 0.01
                                            if ( note === 64 && velocity === 0) {
                                                this.state.synth.voices.map(voice => {
                                                    voice.envelope.release = this.state.ampEnvelope.release
                                                    voice.filterEnvelope.release = this.state.filteEnvelope.release
                                                })
                                            }
                                            else if (note === 64) {
                                                this.state.synth.voices.forEach(voice => {
                                                    voice.envelope.release = sus
                                                    voice.filterEnvelope.release = sus
                                                })
                                            }
                                            
                                            break;
                                            case 224:
                                                this.state.synth.voices.map(voice => {
                                                    voice.oscilator.detune.value = velocity * 2.95
                                                })
                                                break
                                            }
                                        }
                                        navagator.requestMIDIAccess().then(onMIDISuccess, onMIDISuccess, onMIDIFailure)
                                    }

                                    componentDidMount() {
                                        this.state.synth.connect(this.state.filter)
                                        this.state.filter.connect(this.state.volume)
                                        this.state.volume.toMaster()
                                        this.state.filter.frequemcy.value = 200;
                                        this.state. volume.gain.value = 0.8;
                                        this.loadSound()
                                    }

                                    render() {
                                        return (
                                <div>

                                    <Volume 
                                    handleSynthFilterFrequency={this.handleSynthFrequency}
                                    handleFilterEnvAmount={this.handleFilterEnvAmount}
                                    />

                                    <AmpEnvOsc
                                    handleRes={this.handleOscFiltRes}

                                    />

                                    <Filter
                                    frequency={this.state.filterFrequency}
                                    />

                                    <Options 
                                    synth={this.state.synth}
                                    />

                                    <Presets 
                                    handleLoad={this.handleLoadPreset}
                                    />


                                </div>
                                        )
                                    }
                                }

                                