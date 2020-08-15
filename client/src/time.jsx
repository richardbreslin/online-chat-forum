import React, { Component } from "react";

class Timetest extends Component {
  constructor(props) {
    super(props);
    this.tick();
  }
  state = {
    time: "",
  };

  tick() {
    setInterval(() => {
      this.setState({
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);
  }

  render() {
    // this.timeStart();
    return <div>{this.state.time}</div>;
  }
}

export default Timetest;
