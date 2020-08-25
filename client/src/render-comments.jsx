import React, { Component } from "react";
import ForumComment from "./forum-comment";

class RenderComments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderCom = (posts) => {
    if (!posts.length) return null;
    return posts.slice(1).map((post, index) => (
      <div key={index} id="comments">
        <h3>anon # {post.comId}: </h3>
        <img src={post.comURL} alt={post.comBody} />
        <p>
          <span>{post.comBody}</span>
        </p>
        <ForumComment op_id={this.props.op_id} forumId={post.comId} />
      </div>
    ));
  };
  render() {
    return <div>{this.renderCom(this.props.commentData)}</div>;
  }
}

export default RenderComments;
