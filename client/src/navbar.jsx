import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Timetest from "./time";

import "./navbar.css";

class navbar extends Component {
  state = {};
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/home">
            <img
              alt=""
              src="/badsquadburninglogo.gif"
              width="160em"
              height="40em"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">
              <img src="/home.gif" alt="home" class="navHome"></img>
            </Nav.Link>
            <Nav.Link href="/forum">
              <img src="/forum.gif" alt="forum" class="navForum"></img>
            </Nav.Link>
            {/* <Nav.Link href="">ipGrabber</Nav.Link>
            <Nav.Link href="">Proxy</Nav.Link> */}
            <Nav.Link href="/reactlist">reactList</Nav.Link>
            <Nav.Link href="/LETSGO">LETS FUCKING GO 🔊</Nav.Link>
            <Nav.Link href="ts3server://vs20.tserverhq.com/?port=9008">
              <Button size="sm" variant="danger">
                TEAMSPEAK
              </Button>
            </Nav.Link>
            <Nav.Link>
              <Timetest />
            </Nav.Link>
          </Nav>
        </Navbar>
      </>
    );
  }
}

export default navbar;
