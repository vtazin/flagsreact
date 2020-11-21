import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/reducers";

import { updateColorItem } from "../store/actions";

const mapStateToProps = (state: RootState) => {
  return {
    colorItemList: state.colorItems,
  };
};

const connector = connect(mapStateToProps, { updateColorItem });

type StateConnector = ConnectedProps<typeof connector>;

class ColorTable extends Component<StateConnector> {
  textColor(hexTripletColor: string): string {
    let color = hexTripletColor;
    color = color.substring(1); // remove #

    let colorNumericR = parseInt(color.substr(0, 2), 16); // convert to integer
    let colorNumericG = parseInt(color.substr(2, 2), 16); // convert to integer
    let colorNumericB = parseInt(color.substr(4, 2), 16); // convert to integer

    if (colorNumericR + colorNumericG + colorNumericB < 382) {
      color = "#FFFFFF";
    } else {
      color = "#000000";
    }

    // let colorNumeric = parseInt(color, 16); // convert to integer
    // colorNumeric = 0xffffff ^ colorNumeric; // invert three bytes
    // color = colorNumeric.toString(16); // convert to hex
    // color = ("000000" + color).slice(-6); // pad with leading zeros
    // color = "#" + color; // prepend #
    return color;
  }

  render() {
    const smallSize = window.screen.availWidth < 991;
    return (
      <div className="ui center aligned">
        <p>Choose colors:</p>
        <div className={`ui two column grid`}>
          {this.props.colorItemList.map((item) => {
            return (
              <div className="column" key={item.name}>
                <button
                  style={{
                    border: "solid 2px",
                    backgroundColor: item.colorValue,
                    color: this.textColor(item.colorValue),
                    opacity: item.checked ? 1 : 0.2,
                  }}
                  className={`ui ${smallSize ? "mini " : ""} button`}
                  onClick={(e) => {
                    let newItem = { ...item };
                    newItem.checked = !newItem.checked;
                    this.props.updateColorItem(newItem);
                  }}
                >
                  {smallSize ? item.name.slice(0, 1) : item.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connector(ColorTable);
