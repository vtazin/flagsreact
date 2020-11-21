import React, { Component } from "react";
import ColorTable from "./ColorTable";
import FlagTable from "./FlagTable";
import FlagSettings from "./FlagSettings";

export default class App extends Component {
  render() {
    return (
      <div className="ui center aligned segment">
        <div className="ui two column divided relaxed grid">
          <div className="six wide mobile four wide tablet four wide computer four wide large screen column violet">
            <ColorTable />
            <div className="ui divider"></div>
            <FlagSettings />
          </div>
          <div className="ten wide mobile twelve wide tablet twelve wide computer twelve wide large screen column violet">
            <FlagTable />
          </div>
        </div>
      </div>
    );
  }
}
