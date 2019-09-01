import React from 'react'
import ArpeggiatorSlider from './ArpeggiatorSlider'
import Knob from './Knob'

export default class Volume extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="volume">
                <h1>Volume</h1>
                <Knob
                    size={100}
                    numTicks={55}
                    degree={180}
                    min={0}
                    max={127}
                    value={0}
                    color={true}
                    onChange={this.props.handleVolume}
                />

                <label>Env Amount</label>
                <Knob
                    size={100}
                    numTicks={50}
                    degree={200}
                    min={200}
                    value={0}
                    color={true}
                    onChange={this.props.handleSynthFilterFrequency}
                />

            </div>
        )
    }
}