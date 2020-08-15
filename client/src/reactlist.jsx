import React, { Component } from "react";
import Navbar from "./navbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

class Reactlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
    };
  }

  updateInput(key, value) {
    this.setState({
      [key]: value,
    });
  }

  addItem() {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice(),
    };

    const list = [...this.state.list];

    list.push(newItem);

    this.setState({
      list,
      newItem: "",
    });
  }
  deleteItem(id) {
    const list = [...this.state.list];

    const updatedList = list.filter(function (item) {
      if (item.id !== id) {
        return item;
      }
    });

    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="Reactlist">
        <Navbar />
        <Container className="p-3">
          <Jumbotron>
            <h1 className="header">
              Simple Todo list using <img src="favicon.ico"></img>
            </h1>
            <p>this page is purely for reference on this react horse shit :)</p>
          </Jumbotron>

          <div>
            <h5>Add item</h5>
            <br />
          </div>
          <input
            type="text"
            placeholder="type item here..."
            value={this.state.newItem}
            onChange={(e) => this.updateInput("newItem", e.target.value)}
          />
          <button
            onClick={() => this.addItem()}
            disabled={!this.state.newItem.length}
          >
            Add
          </button>
          <br />
          <ul>
            {this.state.list.map((item) => {
              return (
                <li key={item.id}>
                  {item.value}
                  <button onClick={() => this.deleteItem(item.id)}>X</button>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    );
  }
}

export default Reactlist;
