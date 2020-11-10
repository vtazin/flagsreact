import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../store/reducers";
import { MeshDescription } from "../worker/helper/helper";

import workerApi from "../worker/workerApi";
import CanvasPlane from "./Canvas/CanvasPlane";

const mapStateToProps = (state: RootState) => {
  return {
    ...state,
  };
};

const connector = connect(mapStateToProps);

class FlagTable extends Component<
  ConnectedProps<typeof connector>,
  MeshDescription
> {
  constructor(props: ConnectedProps<typeof connector>) {
    super(props);
    this.state = {
      count: 0,
      colorOffset: 0,
      leftBottomOffset: 0,
      itemsCount: 0,
      arrayBuffer: new Float32Array(),
    };
  }

  getSelectedColors = () => {
    return this.props.colorItems.filter((colorItem) => {
      return colorItem.checked;
    });
  };

  fillSet = async () => {
    const startTime = Date.now();

    const result = await workerApi.fillCommand(
      this.props.flagSettings,
      this.getSelectedColors()
    );
    console.log("getResult:" + (Date.now() - startTime) / 1000);
    this.setState(result);
  };

  render() {
    return (
      <div>
        <button onClick={this.fillSet}>Calc</button>
        <p>{`Total: ${this.state.count}`}</p>

        <CanvasPlane description={this.state} />
      </div>
    );
  }
}

export default connector(FlagTable);
