import React, { Component, Fragment } from "react";
import axios from "axios";
import "./forum.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "./navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

class forum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: "",
      forumBody: "",
      forumId: "",

      recievedFormData: [],
    };
  }

  componentDidMount = () => {
    this.getHandler();
  };

  getHandler = () => {
    axios
      .get("/api/getposts")
      .then((response) => {
        const data = response.data;
        this.setState({
          recievedFormData: data,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error retriving data!");
      });
  };

  submitHandler = async (event) => {
    event.preventDefault();

    const { imageURL, forumBody, forumId } = this.state;

    const forumPostData = {
      imageURL,
      forumBody,
      forumId,
    };

    await axios
      .post("/api/createpost", forumPostData)
      .then(() => alert("post submitted!"))
      .catch((error) => {
        console.log(error);
      });
    await window.location.reload(false);
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      forumId: Math.round(Math.random() * Number.MAX_SAFE_INTEGER),
    });
  };

  renderPosts = (posts) => {
    if (!posts.length) return null;
    return posts.map((post, index) => (
      <Row md="auto" id="posts">
        <div key={index}>
          <h3>anon # {post.forumId}: </h3>
          <img src={post.imageURL} alt={post.forumId} />
          <p>{post.forumBody}</p>
        </div>
      </Row>
    ));
  };

  render() {
    return (
      <div className="forum">
        <Navbar />

        <Container>
          <Row>
            <Col md id="maincol">
              <Form onSubmit={this.submitHandler} href="/createpost">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label id="formtext">
                    Direct image link (.png, .jpg, etc)
                  </Form.Label>
                  <Form.Control
                    type="link"
                    placeholder="imgur.com/pokimane.png"
                    name="imageURL"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label id="formtext">Write here</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows="3"
                    name="forumBody"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Button variant="danger" type="submit">
                  SUBMIT
                </Button>
                <small id="formtext">
                  (Limit 1 post per 15 minutes... per IP heh)
                </small>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md id="maincol2">
              <div>{this.renderPosts(this.state.recievedFormData)}</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default forum;
