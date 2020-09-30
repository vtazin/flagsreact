import React, { Component } from "react";
import ColorTable from "./ColorTable";
import FlagTable from "./FlagTable";
import TypeSelector from "./TypeSelector";

export default class App extends Component {
  render() {
    return (
      <div style={{ padding: "5px" }} className="ui grid">
        <div className="two wide column grey">
          <ColorTable />
          <TypeSelector />
        </div>
        <div className="fourteen wide column green">
          <FlagTable />
        </div>
      </div>
    );
  }
}
