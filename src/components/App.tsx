import React, { Component } from "react";
import ColorTable from "./ColorTable";
import FlagTable from "./FlagTable";
import TypeSelector from "./TypeSelector";

export default class App extends Component {
  render() {
    return (
      <div>
        <ColorTable />
        <TypeSelector />
        <FlagTable />
      </div>
    );
  }
}
