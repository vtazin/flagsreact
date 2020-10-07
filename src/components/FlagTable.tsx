import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Transition } from "react-transition-group";
import { RootState } from "../store/reducers";
import { ColorItem } from "../store/reducers/colorItems";
import FlagElement from "./FlagElement";

const duration = 700;

const defaultStyle = {
  transition: `opacity ${duration}ms, transform ${duration}ms`,
  display: "inline-block",
  margin: "2px",
};

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

  fillFunc = (
    indexes: number[],
    resultDictionary: { [key: string]: ColorItem[] },
    n: number
  ) => {
    const fillFlag = n >= this.props.flagSettings.colorNumbers - 1;
    const colorItemList = this.getSelectedColors();
    for (let i = 0; i < colorItemList.length; i++) {
      if (this.props.flagSettings.withoutRepeat && indexes.includes(i)) {
        continue;
      }
      indexes[n] = i;
      if (fillFlag) {
        if (this.props.flagSettings.strictOrder) {
          indexes.sort();
        }
        const index = indexes.join("_");
        if (!resultDictionary.hasOwnProperty(index))
          resultDictionary[index] = indexes.map(
            (index) => colorItemList[index]
          );
      } else {
        this.fillFunc(indexes, resultDictionary, n + 1);
      }
    }
    indexes.length = n;
  };

  fillSet = () => {
    const result: ColorItem[][] = [];

    const resultDictionary: { [key: string]: ColorItem[] } = {};

    this.fillFunc([], resultDictionary, 0);

    for (const key in resultDictionary) {
      result.push(resultDictionary[key]);
    }
    return result;
    // return result.sort(() => (Math.random() > 0.5 ? 1 : -1));
  };

  render() {
    const flagList = this.fillSet();
    return (
      <div>
        <p>{`Total: ${flagList.length}`}</p>
        <ul>
          {flagList.map((colorItems, i) => {
            let key = ""; //Math.random().toString();
            const colors: string[] = [];
            colorItems.forEach((colorItem) => {
              key += colorItem.name;
              colors.push(colorItem.colorValue);
            });

            const transitionStyles = {
              entering: { opacity: 0 },
              entered: { opacity: 1 },
            };

            return (
              <Transition in={true} appear timeout={33} key={key}>
                {(state: "entering") => (
                  <div
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state],
                    }}
                  >
                    <FlagElement colorList={colors} />
                  </div>
                )}
              </Transition>
            );

            // ;
          })}
        </ul>
      </div>
    );
  }
}

export default connector(FlagTable);
