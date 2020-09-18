import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../reducers";
import { ColorItem } from "./ColorTable";
import FlagElement from "./FlagElement";

const mapStateToProps = (state: RootState) => {
  return {
    ...state,
  };
};

const connector = connect(mapStateToProps);

class FlagTable extends Component<ConnectedProps<typeof connector>> {
  getSelectedColors = () => {
    return this.props.colorItems.filter((colorItem) => {
      return colorItem.checked;
    });
  };

  fillSet = () => {
    const result: ColorItem[][] = [];
    const colorItemList = this.getSelectedColors();

    let b, c;
    for (let i = 0; i < colorItemList.length; i++) {
      b = i + 1;
      for (let j = b; j < colorItemList.length; j++) {
        c = j + 1;
        for (let k = c; k < colorItemList.length; k++) {
          result.push([colorItemList[i], colorItemList[j], colorItemList[k]]);
        }
      }
    }
    return result;
  };

  render() {
    return (
      <div>
        <ul>
          {this.fillSet().map((colorItems) => {
            let key = "";
            const colors: string[] = [];
            colorItems.forEach((colorItem) => {
              key += colorItem.name;
              colors.push(colorItem.colorValue);
            });
            return <FlagElement key={key} colorList={colors} />;
          })}
        </ul>
      </div>
    );
  }
}

export default connector(FlagTable);
