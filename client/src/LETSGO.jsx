import React, { Component } from "react";
import Navbar from "./navbar";
import Bgvideo from "./background-video";
import "./home.css";

class LETSGO extends Component {
  render() {
    return (
      <div>
        <Bgvideo />
        <Navbar />
        <iframe
          width="2000"
          height="2000"
          src="https://www.youtube.com/embed/-MaCJZIBKGs?controls=0?rel=0&autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    );
  }
}

export default LETSGO;
