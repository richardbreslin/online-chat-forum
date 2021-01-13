import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

class ForumAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  message = () => {
    if (this.props.type === "danger") {
      return (
        <div>
          <Alert.Heading>Error</Alert.Heading>
          <p> Somthing went wrong</p>
        </div>
      );
    }
    if (this.props.type === "success") {
      return (
        <div>
          <Alert.Heading> Success</Alert.Heading>
          <p>
            {" "}
            Posted!
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <Alert.Heading> neither succeeded nor failed... </Alert.Heading>
          <p>
            because of this incident there is no bootstrap alert type so this
            looks a little awkward huh. not sure why im putting this here but
            maybe somone will see this if they try to break my site.
          </p>
        </div>
      );
    }
  };
  render() {
    return this.state.show ? (
      <Alert
        variant={this.props.type}
        onClose={() => this.setState({ show: false })}
        dismissible
      >
        {this.message()}
      </Alert>
    ) : null;
  }
}

export default ForumAlert;
