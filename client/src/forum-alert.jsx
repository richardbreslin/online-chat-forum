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
          <Alert.Heading> nah dawg this aint it. </Alert.Heading>
          <p> sumn ain right G. sitcha ass back down n try again.</p>
        </div>
      );
    }
    if (this.props.type === "success") {
      return (
        <div>
          <Alert.Heading> Real Trap Shit! </Alert.Heading>
          <p>
            {" "}
            yo shit posted homie! ay u tryna run 2k? (might wanna refresh if
            this is a comment. will fix soon ;) )
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
