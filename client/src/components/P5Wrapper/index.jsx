import React, { Component } from "react";
import PropTypes from "prop-types";
import sketch from "./sketch.js";
// import sketchTwo from "./sketchTwo.js";
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
    // this.canvasTwo = new window.p5(sketchTwo, "app-p5_container");
    this.canvas.setOnReady(this.props.onReady);
    // this.canvasTwo.setOnReady(this.props.onReady);
    
  }

  componentWillReceiveProps(nextProps) {
    this.canvas.pushProps(nextProps);
    // this.canvasTwo.pushProps(nextProps);
  }

  shouldComponentUpdate() { 
    return false;
  }

  componentWillUnmount() {
    this.canvas.remove();
    // this.canvasTwo.remove();
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
