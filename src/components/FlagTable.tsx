import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../store/reducers";
import { MeshDescription } from "../worker/helper/helper";

import workerApi from "../worker/workerApi";
import CanvasPlane from "./Canvas/CanvasPlane";
import { ColorRGBA } from "./Canvas/SimpleWebGL";

const mapStateToProps = (state: RootState) => {
  return {
    ...state,
  };
};

const connector = connect(mapStateToProps);

class FlagTable extends Component<
  ConnectedProps<typeof connector>,
  MeshDescription & { loading: boolean }
> {
  colorList: ColorRGBA[];
  constructor(props: ConnectedProps<typeof connector>) {
    super(props);
    this.state = {
      count: 0,
      colorOffset: 0,
      leftBottomOffset: 0,
      itemsCount: 0,
      arrayBuffer: new Float32Array(),
      loading: false,
    };

    this.colorList = this.props.colorItems.map((colorItem) =>
      FlagTable.convertColor(colorItem.colorValue)
    );
  }

  private static convertColor(colorValue: string): ColorRGBA {
    let color = colorValue;
    color = color.substring(1); // remove #

    let colorNumericR = parseInt(color.substr(0, 2), 16) / 255; // convert to integer
    let colorNumericG = parseInt(color.substr(2, 2), 16) / 255; // convert to integer
    let colorNumericB = parseInt(color.substr(4, 2), 16) / 255; // convert to integer

    return [colorNumericR, colorNumericG, colorNumericB, 1];
  }

  getSelectedColors = () => {
    return this.props.colorItems.reduce((filtered, colorItem, currentIndex) => {
      if (colorItem.checked) {
        filtered.push(currentIndex);
      }
      return filtered;
    }, [] as number[]);
  };

  fillSet = async () => {
    this.setState({ loading: true });

    const result = await workerApi.fillCommand(
      this.props.flagSettings,
      this.getSelectedColors()
    );

    this.setState({ ...result, loading: false });
  };

  componentDidMount() {
    this.fillSet();
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <button
          className={`ui big button green ${
            this.state.loading ? "loading" : ""
          }`}
          onClick={this.fillSet}
        >
          Calc
        </button>

        <p>{`Total: ${this.state.count}`}</p>

        <CanvasPlane description={this.state} colorList={this.colorList} />
      </div>
    );
  }
}

export default connector(FlagTable);
