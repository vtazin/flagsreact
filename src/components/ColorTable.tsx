import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../reducers";
import { ColorList } from "../resources/colorList";
import { addColorItem, updateColorItem } from "../actions";

export type ColorItem = {
  name: string;
  checked: boolean;
  colorValue: string;
};

let mapStateToProps = (state: RootState) => {
  return {
    colorItemList: state.colorItems,
  };
};

let connector = connect(mapStateToProps, { addColorItem, updateColorItem });

type StateConnector = ConnectedProps<typeof connector>;

class ColorTable extends Component<StateConnector> {
  constructor(props: StateConnector) {
    super(props);

    for (let name in ColorList) {
      props.addColorItem({
        name: name,
        checked: true,
        colorValue: ColorList[name],
      });
    }
  }

  textColor(hexTripletColor: string): string {
    let color = hexTripletColor;
    color = color.substring(1); // remove #
    let colorNumeric = parseInt(color, 16); // convert to integer
    colorNumeric = 0xffffff ^ colorNumeric; // invert three bytes
    color = colorNumeric.toString(16); // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color; // prepend #
    return color;
  }

  getActiveColors(): ColorItem[] {
    const result: ColorItem[] = [];
    this.props.colorItemList.forEach((value) => {
      if (value.checked) {
        result.push(value);
      }
    });

    return result;
  }

  componentDidMount() {
    console.log(this.getActiveColors());
  }

  componentDidUpdate() {
    console.log(this.getActiveColors());
  }

  render() {
    return (
      <div>
        <table>
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
                  <td>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => {
                        let newItem = { ...item };
                        newItem.checked = e.target.checked;
                        this.props.updateColorItem(newItem);
                      }}
                    />
                  </td>
                  <td
                    style={{
                      border: "solid",
                      backgroundColor: item.colorValue,
                      color: this.textColor(item.colorValue),
                    }}
                  >
                    {item.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connector(ColorTable);
