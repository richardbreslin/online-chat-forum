import React, { Component } from "react";
import "./home.css";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Navbar from "./navbar";

class forum extends Component {
  state = {};

  render() {
    return (
      <div className="Home">
        <Navbar />

        <Container className="p-3">
          <Jumbotron>
            <h1 className="header">forum goes here</h1>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default forum;
