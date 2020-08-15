import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "./navbar";
import Bgvideo from "./background-video";

class Home extends Component {
  state = { users: [] };

  render() {
    return (
      <div className="home">
        <Bgvideo />
        <Navbar />
        <Container className="homejumbo">
          <h1 className="header">
            <img src="./welcome2.gif" alt=""></img>
          </h1>
          <p>
            <i>balls will be busted...</i>
          </p>
        </Container>
      </div>
    );
  }
}

export default Home;
