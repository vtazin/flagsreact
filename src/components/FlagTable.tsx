import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Transition } from "react-transition-group";

import { RootState } from "../reducers";
import { ColorItem } from "./ColorTable";
import FlagElement from "./FlagElement";

const duration = 700;

const defaultStyle = {
  transition: `opacity ${duration}ms, transform ${duration}ms`,
  display: "inline-block",
  margin: "10px",
};

// const transitionStyles = {
//   entering: { opacity: 0.5 },
//   entered: { opacity: 1, transform: "translate(100px, 200px)" },
// };

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

    // let b, c;
    // for (let i = 0; i < colorItemList.length; i++) {
    //   b = i + 1;
    //   for (let j = b; j < colorItemList.length; j++) {
    //     c = j + 1;
    //     for (let k = c; k < colorItemList.length; k++) {
    //       result.push([colorItemList[i], colorItemList[j], colorItemList[k]]);
    //     }
    //   }
    // }

    for (let i = 0; i < colorItemList.length; i++) {
      for (let j = 0; j < colorItemList.length; j++) {
        if (colorItemList[i] === colorItemList[j]) {
          continue;
        }
        for (let k = 0; k < colorItemList.length; k++) {
          if (colorItemList[j] === colorItemList[k]) {
            continue;
          }
          result.push([colorItemList[i], colorItemList[j], colorItemList[k]]);
        }
      }
    }

    return result.sort(() => (Math.random() > 0.5 ? 1 : -1));
  };

  render() {
    return (
      <div>
        <ul>
          {this.fillSet().map((colorItems, i) => {
            let key = Math.random().toString();
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
              <Transition in={true} appear timeout={33 * i} key={key}>
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
