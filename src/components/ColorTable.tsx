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
    return (
      <table className="ui celled inverted table">
        <thead>
          <tr>
            <th>#</th>
            <th>Colors</th>
          </tr>
        </thead>
        <tbody>
          {this.props.colorItemList.map((item) => {
            return (
              <tr key={item.name}>
                <td data-label="#">
                  <div className="ui input">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => {
                        let newItem = { ...item };
                        newItem.checked = e.target.checked;
                        this.props.updateColorItem(newItem);
                      }}
                    />
                  </div>
                </td>
                <td data-label="Colors">
                  <div
                    style={{
                      border: "solid 1px",
                      backgroundColor: item.colorValue,
                      color: this.textColor(item.colorValue),
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default connector(ColorTable);
