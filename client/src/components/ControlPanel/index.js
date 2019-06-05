import React, { Component } from "react";
import PropTypes from "prop-types";
import config from "../../lib/config/";

export default class ControlPanel extends Component {
  static propTypes = {
    drums: PropTypes.array.isRequired,
    onSliderChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="container">
        {
          config.sliders.map((item, index) => (
            <div
              key={`slider-${index}-${item.key}`}
              style={{ fontSize: "0.8rem" }}
            >
              <strong>{item.label}</strong>:&nbsp;
              {this.props.drums[0][item.key].toFixed(item.precision)}
              <br />
              <input
                type="range"
                min={item.min} max={item.max} step={item.step}
                value={this.props.drums[0][item.key]}
                style={{ width: "100%" }}
                onChange={this.props.onSliderChange(item.key)}
              />
              <br />
            </div>
          ))
        }

        {/* <div className="text-center">
          {this.props.drums.map((drum, index) => (
            <span key={`branches-num-item${index}`}>
              <strong>
                drum {(index + 1)}
              </strong>
              <span>

              </span>
            </span>
          ))}
        </div> */}
      </div>
    );
  }
}
