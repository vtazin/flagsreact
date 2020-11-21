import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/reducers";
import { updateFlagSettings } from "../store/actions";

const mapStateToProps = (state: RootState) => {
  return {
    flagSettings: state.flagSettings,
    colorsCount: state.colorItems.length,
  };
};
const connector = connect(mapStateToProps, { updateFlagSettings });

class FlagSettings extends Component<ConnectedProps<typeof connector>> {
  get withoutRepeat() {
    return this.props.flagSettings.withoutRepeat;
  }

  set withoutRepeat(value: boolean) {
    this.props.updateFlagSettings({ withoutRepeat: value });
  }
  get strictOrder() {
    return this.props.flagSettings.strictOrder;
  }

  set strictOrder(value: boolean) {
    this.props.updateFlagSettings({ strictOrder: value });
  }

  get colorNumbers() {
    return this.props.flagSettings.colorNumbers;
  }
  set colorNumbers(value: number) {
    this.props.updateFlagSettings({ colorNumbers: value });
  }

  render() {
    return (
      <div className="ui center aligned">
        <p>Number of colors:</p>
        <div className="mini ui buttons">
          <button
            className="ui button"
            onClick={() =>
              (this.colorNumbers = Math.max(this.colorNumbers - 1, 1))
            }
          >
            <i className="minus chevron icon"></i>
          </button>
          <div className="or" data-text={this.colorNumbers.toString()}></div>
          <button
            className="ui button"
            onClick={() =>
              (this.colorNumbers = Math.min(
                this.colorNumbers + 1,
                this.props.colorsCount
              ))
            }
          >
            <i className="plus chevron icon"></i>
          </button>
        </div>
        <div className="ui divider"></div>
        <p>Choose template:</p>
        <div className="ui center aligned one column grid">
          <div className="column">
            <button
              className={`mini ui toggle button ${
                !this.withoutRepeat ? "active" : ""
              }`}
              onClick={() => (this.withoutRepeat = !this.withoutRepeat)}
            >
              Duplication
            </button>
          </div>
          <div className="column">
            <button
              className={`mini ui toggle button ${
                !this.strictOrder ? "active" : ""
              }`}
              onClick={() => (this.strictOrder = !this.strictOrder)}
            >
              Position
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connector(FlagSettings);
