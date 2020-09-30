import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Transition } from "react-transition-group";

import { RootState } from "../reducers";
import { FlagColorType } from "../reducers/colorType";
import { ColorItem } from "./ColorTable";
import FlagElement from "./FlagElement";

const duration = 0;

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

  fillSet = () => {
    const result: ColorItem[][] = [];
    const colorItemList = this.getSelectedColors();

    const resultDictionary: { [key: string]: ColorItem[] } = {};

    const strictMode = this.props.colorType === FlagColorType.STRICT;

    for (let i = 0; i < colorItemList.length; i++) {
      for (let j = 0; j < colorItemList.length; j++) {
        for (let k = 0; k < colorItemList.length; k++) {
          const colorI = colorItemList[i];
          const colorJ = colorItemList[j];
          const colorK = colorItemList[k];

          if (strictMode && (i === j || i === k || j === k)) {
            continue;
          }

          // if (strictMode) {
          resultDictionary[`${i}_${j}_${k}`] = [colorI, colorJ, colorK];
          resultDictionary[`${i}_${k}_${j}`] = [colorI, colorK, colorJ];
          resultDictionary[`${j}_${i}_${k}`] = [colorJ, colorI, colorK];
          resultDictionary[`${j}_${k}_${i}`] = [colorJ, colorK, colorI];
          resultDictionary[`${k}_${i}_${j}`] = [colorK, colorI, colorJ];
          resultDictionary[`${k}_${j}_${i}`] = [colorK, colorJ, colorI];
          // } else {
          //   if (colorI !== colorJ && colorJ !== colorK) {
          //     resultDictionary[`${i}_${j}_${k}`] = [colorI, colorJ, colorK];
          //     if (colorI !== colorK) {
          //       resultDictionary[`${k}_${j}_${i}`] = [colorK, colorJ, colorI];
          //     }
          //   }
          //   if (colorI !== colorK && colorJ !== colorK) {
          //     resultDictionary[`${i}_${k}_${j}`] = [colorI, colorK, colorJ];
          //     if (colorI !== colorJ) {
          //       resultDictionary[`${j}_${k}_${i}`] = [colorJ, colorK, colorI];
          //     }
          //   }
          //   if (colorI !== colorJ && colorI !== colorK) {
          //     resultDictionary[`${j}_${i}_${k}`] = [colorJ, colorI, colorK];
          //     if (colorJ !== colorK) {
          //       resultDictionary[`${k}_${i}_${j}`] = [colorK, colorI, colorJ];
          //     }
          //   }
          // }
        }
      }
    }

    for (const key in resultDictionary) {
      result.push(resultDictionary[key]);
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
              <Transition in={true} appear timeout={0} key={key}>
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
