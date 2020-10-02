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

  fillSet = () => {
    const result: ColorItem[][] = [];
    const colorItemList = this.getSelectedColors();

    const resultDictionary: { [key: string]: ColorItem[] } = {};

    for (let i = 0; i < colorItemList.length; i++) {
      for (let j = 0; j < colorItemList.length; j++) {
        for (let k = 0; k < colorItemList.length; k++) {
          if (this.props.flagSettings.strictOrder) {
            if (
              this.props.flagSettings.withoutRepeat &&
              (i === j || i === k || j === k)
            ) {
              continue;
            }
            const a = Math.min(i, j, k);
            const c = Math.max(i, j, k);
            let b;
            if (a !== i && c !== i) {
              b = i;
            } else if (a !== j && c !== j) {
              b = j;
            } else {
              b = k;
            }

            resultDictionary[`${a}_${b}_${c}`] = [
              colorItemList[a],
              colorItemList[b],
              colorItemList[c],
            ];
          } else {
            if (
              this.props.flagSettings.withoutRepeat &&
              (i === j || i === k || j === k)
            ) {
              continue;
            }

            const colorI = colorItemList[i];
            const colorJ = colorItemList[j];
            const colorK = colorItemList[k];

            resultDictionary[`${i}_${j}_${k}`] = [colorI, colorJ, colorK];
          }
        }
      }
    }

    for (const key in resultDictionary) {
      result.push(resultDictionary[key]);
    }

    return result.sort(() => (Math.random() > 0.5 ? 1 : -1));
  };

  render() {
    const flagList = this.fillSet();
    return (
      <div>
        <p>{`Total: ${flagList.length}`}</p>
        <ul>
          {flagList.map((colorItems, i) => {
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
