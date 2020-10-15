import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Transition } from "react-transition-group";
import { RootState } from "../store/reducers";
import { ColorItem } from "../store/reducers/colorItems";
import workerApi from "../worker/workerApi";
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

class FlagTable extends Component<
  ConnectedProps<typeof connector>,
  { flagList: ColorItem[][] }
> {
  constructor(props: ConnectedProps<typeof connector>) {
    super(props);
    this.state = { flagList: [] };
  }

  getSelectedColors = () => {
    return this.props.colorItems.filter((colorItem) => {
      return colorItem.checked;
    });
  };

  fillSet = async () => {
    const result: ColorItem[][] = [];
    const resultDictionary = await workerApi.fillCommand(
      this.props.flagSettings,
      this.getSelectedColors()
    );
    console.log(resultDictionary);

    for (const key in resultDictionary) {
      result.push(resultDictionary[key]);
    }
    this.setState({ flagList: result });
    // return result.sort(() => (Math.random() > 0.5 ? 1 : -1));
  };

  render() {
    const flagList = this.state.flagList;
    return (
      <div>
        <button onClick={this.fillSet}>Calc</button>
        <p>{`Total: ${flagList.length}`}</p>
        <ul>
          {flagList.map((colorItems, i) => {
            let key = "";
            const colors: string[] = [];
            colorItems.forEach((colorItem) => {
              key += colorItem.name;
              colors.push(colorItem.colorValue);
            });

            const transitionStyles = {
              entering: { opacity: 0 },
              entered: { opacity: 1 },
            };

            if (i > 100) {
              return null;
            }

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
