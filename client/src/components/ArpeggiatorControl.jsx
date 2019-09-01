import React, { Component } from 'react'
import { Button, Input, Icon } from 'semantic-ui-react'

export default class ArpeggiatorSlider extends React.Component {
    constructor(props) {
        super(props);
        this.fullAngle = props.degrees;
        this.startAngle = (360 - props.degrees) / 2;
        this.endAngle = this.startAngle + props.degrees;
        this.margin = props.size * 0.15;
        // this.currentDeg = Math.floor(
        //   this.convertRange(
        //     props.min,
        //     props.max,
        //     this.startAngle,
        //     this.endAngle,
        //     props.value
        //   )
        // );
        this.state = {
          deg: this.currentDeg,
          newValue: '',
          arpeggiatorState: ''
        };
      }


      onChange = (newValue) => {
        this.setState({
          newValue: newValue
        })
        console.log(this.state.newValue)
      }
      startDrag = e => {
        e.preventDefault();
        const knob = e.target.getBoundingClientRect();
        const pts = {
          x: knob.left + knob.width / 2,
          y: knob.top + knob.height / 2
        };
        const moveHandler = e => {
          this.currentDeg = this.getDeg(e.clientX, e.clientY, pts);
          if (this.currentDeg === this.startAngle) this.currentDeg--;
        //   let newValue = Math.floor(
        //     this.convertRange(
        //       this.startAngle,
        //       this.endAngle,
        //       this.props.min,
        //       this.props.max,
        //       this.currentDeg
        //     )
        //   );
          this.setState({ deg: this.currentDeg });
        //   this.props.onChange(newValue);
        };
        document.addEventListener("mousemove", moveHandler);
        console.log(this.startDrag, 'move')
        document.addEventListener("mouseup", e => {
          document.removeEventListener("mousemove", moveHandler);
        });
      };



    render() {
        return (
            <React.Fragment>
                <div className="ticks" onMouseDown={this.startDrag}>
                    {this.props.numTicks
                        ? this.renderTicks().map((tick, i) => (
                            <div
                                key={i}
                                className={
                                    "tick" + (tick.deg <= this.currentDeg ? " active" : "")
                                }
                                style={tick.tickStyle}
                            />
                        ))
                        : null}
                </div>
            </React.Fragment>
        )
    }
}
