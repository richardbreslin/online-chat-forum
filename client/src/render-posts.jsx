import React, { Component } from "react";
import ForumComment from "./forum-comment";
import RenderComments from "./render-comments";
import Row from "react-bootstrap/Row";

class RenderPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPosts = (posts) => {
    if (!posts.length) return null;
    return posts.reverse().map((post, index) => (
      <Row md="auto" id="posts">
        <div key={index}>
          {/* main post */}
          <h3>anon # {post.forumId}: </h3>
          <img src={post.imageURL} alt={post.forumId} />
          <p>
            <span>{post.forumBody}</span>
          </p>
          {/* comments */}
          <div>
            <ForumComment anon={post._id} forumId={post.forumId} />
          </div>
          <div>
            <div>
              <RenderComments
                commentData={this.props.recievedFormData[index].comments}
                op_id={this.props.recievedFormData[index]}
              />
            </div>
          </div>
        </div>
      </Row>
    ));
  };

  render() {
    return <div>{this.renderPosts(this.props.recievedFormData)}</div>;
  }
}

export default RenderPosts;
