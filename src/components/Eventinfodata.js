import { Component } from "react";
import "./Eventinfo.css";
import React from "react";

class Eventinfodata extends Component {
  render() {
    return (
      <div className="first-event">
        <div className="event-text">
          <h2>{this.props.heading}</h2>
          <p>{this.props.text}</p>
        </div>

        <div className="image">
          <img alt="img" src={this.props.img1} />
          <img alt="img" src={this.props.img2} />
        </div>
      </div>
    );
  }
}

export default Eventinfodata;
