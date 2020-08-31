import React, { Component, lazy, Suspense } from "react";
import axios from "axios";
import "./forum.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "./navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ForumAlert from "./forum-alert";
import Spinner from "react-bootstrap/Spinner";

const RenderPosts = lazy(() => import("./render-posts"));

class forum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: "",
      forumBody: "",
      forumId: "",
      alert: {
        show: false,
        type: "",
      },
      comments: {
        comURL: "",
        comBody: "",
      },
      recievedFormData: [],
      errors: [],
    };
  }

  componentDidMount = () => {
    this.getHandler();
  };

  alertHandler = (typeIn) => {
    this.setState({ alert: { type: typeIn, show: true } });
  };

  hasError = (key) => {
    return this.state.errors.indexOf(key) !== -1;
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
        this.alertHandler("danger");
      });
  };

  submitHandler = (event) => {
    event.preventDefault();

    var errors = [];

    var linkExpression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var linkIsValid = new RegExp(linkExpression);

    if (!this.state.imageURL.match(linkIsValid)) {
      errors.push("imageURL");
      this.setState({
        errors: errors,
      });
    }
    if (this.state.forumBody === "") {
      errors.push("forumBody");
      this.setState({
        errors: errors,
      });
    }

    if (errors.length > 0) {
      this.alertHandler("danger");
      return false;
    } else {
      const {
        imageURL,
        forumBody,
        forumId,
        comments: { comURL, comBody },
      } = this.state;

      const forumPostData = {
        imageURL,
        forumBody,
        forumId,
        comments: {
          comURL,
          comBody,
        },
      };
      console.log(forumPostData);
      axios
        .post("/api/createpost", forumPostData)
        .then(() => this.getHandler())
        .catch((error) => {
          this.alertHandler("danger");
          console.log(error);
        });

      this.alertHandler("success");
      this.getHandler();
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      forumId: Math.round(Math.random() * Number.MAX_SAFE_INTEGER),
    });
  };

  render() {
    return (
      <div className="forum">
        <Navbar />
        <Container>
          <Row>
            <Col md id="maincol">
              {this.state.alert.show ? (
                <ForumAlert type={this.state.alert.type} />
              ) : null}
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
                    value={this.state.imageURL}
                    className={
                      this.hasError("imageURL")
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  <div
                    className={
                      this.hasError("imageURL") ? "inline-errormsg" : "hidden"
                    }
                  >
                    rightclick -> copy image address. it aint that hard buddy
                  </div>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label id="formtext">Write here</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows="3"
                    name="forumBody"
                    onChange={this.handleInputChange}
                    className={
                      this.hasError("forumBody")
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    value={this.state.forumBody}
                  />
                  <div
                    className={
                      this.hasError("forumBody") ? "inline-errormsg" : "hidden"
                    }
                  >
                    You can think of something to write...
                  </div>
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
            {/* lazy loading here */}
            <Col md id="maincol2">
              <Suspense
                fallback={
                  <Spinner animation="border" variant="danger">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                }
              >
                <RenderPosts recievedFormData={this.state.recievedFormData} />
              </Suspense>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default forum;
