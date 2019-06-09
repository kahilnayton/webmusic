import React, { Component } from "react";
import PropTypes from "prop-types";
import sketch from "./sketch.js";
import './sketch.css'


class P5Wrapper extends Component {
  setState
  static propTypes = {
    colors: PropTypes.array.isRequired,
    updateApp: PropTypes.func
    // renderPattern: PropTypes.func.isRequired,
    // onReady: PropTypes.func.isRequired,
  };

  componentDidMount() {

    this.canvas = new window.p5(sketch, "app-p5_container");
    
  }

  componentWillReceiveProps(nextProps) {
    this.canvas.pushProps(nextProps);
  }

  shouldComponentUpdate() { 
    return false;
  }

  componentWillUnmount() {
    this.canvas.remove();
  }

  render() {
    return (
      <div
        id="app-p5_container"
        style={{ width: "100%", textAlign: "center" }}
      />
    );
  }
}

export default P5Wrapper;
