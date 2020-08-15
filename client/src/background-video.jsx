import React, { Component } from "react";

class Bgvideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoURL: "/ericandre.webm",
    };
  }
  render() {
    return (
      <video id="background-video" loop muted autoPlay>
        <source src={this.state.videoURL} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    );
  }
}

export default Bgvideo;
