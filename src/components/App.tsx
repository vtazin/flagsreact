import React, { Component } from "react";
import ColorTable from "./ColorTable";
import FlagTable from "./FlagTable";
import FlagSettings from "./FlagSettings";

export default class App extends Component {
  render() {
    return (
      <div style={{ padding: "5px" }} className="ui two column grid">
        <div className="four wide column grey">
          <ColorTable />
          <hr />
          <FlagSettings />
        </div>
        <div className="twelve wide column green">
          <FlagTable />
        </div>
      </div>
    );
  }
}
