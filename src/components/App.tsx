import React, { Component } from "react";
import ColorTable from "./ColorTable";
import FlagTable from "./FlagTable";
import TypeSelector from "./TypeSelector";

export default class App extends Component {
  render() {
    return (
      <div style={{ padding: "5px" }} className="ui grid">
        <div className="three wide column grey">
          <ColorTable />
          <hr />
          <TypeSelector />
        </div>
        <div className="thirteen wide column green">
          <FlagTable />
        </div>
      </div>
    );
  }
}
