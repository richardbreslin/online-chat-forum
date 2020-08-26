import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ForumAlert from "./forum-alert";

class ForumComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCommentForm: false,
      _id: props.op_id || props.anon,
      comURL: "",
      comBody: "",
      comId: "",
      alert: {
        show: false,
        type: "",
      },
    };
  }
  alertHandler = (typeIn) => {
    this.setState({ alert: { type: typeIn, show: true } });
  };

  submitHandler = async (event) => {
    event.preventDefault();

    const { _id, comURL, comBody, comId } = this.state;

    const commentPostData = {
      _id,
      comments: { comURL, comBody, comId },
    };

    await axios
      .put("/api/reply", commentPostData)
      .then(() => this.alertHandler("success"))
      .catch((error) => {
        console.log(error);
        this.alertHandler("danger");
      });
    window.location.reload(false);
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      comId: Math.round(Math.random() * Number.MAX_SAFE_INTEGER),
    });
  };

  isClicked = () => {
    this.setState({ viewCommentForm: !this.state.viewCommentForm });
  };

  render() {
    return (
      <div>
        <Button variant="danger" onClick={this.isClicked}>
          {this.state.viewCommentForm ? "HIDE" : "REPLY"}
        </Button>
        {this.state.alert.show ? (
          <ForumAlert type={this.state.alert.type} />
        ) : null}

        {this.state.viewCommentForm ? (
          <div>
            <Form onSubmit={this.submitHandler} href="/reply">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label id="formtext">
                  Direct image link (.png, .jpg, etc)
                </Form.Label>
                <Form.Control
                  type="link"
                  placeholder="imgur.com/pokimane.png"
                  name="comURL"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label id="formtext">Write here</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows="3"
                  name="comBody"
                  defaultValue={"@" + this.props.forumId + ", "}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Button type="submit">SUBMIT</Button>
              <small id="formtext">
                (Limit 1 Comment per 5 minutes... per IP heh)
              </small>
            </Form>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ForumComment;
