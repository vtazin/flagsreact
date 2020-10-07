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
      <div className="ui column stackable container">
        <p>Choose template:</p>
        <div className="ui input">
          <input
            type="checkbox"
            id="withoutRepeat"
            name="flagType"
            checked={!this.withoutRepeat}
            onChange={() => (this.withoutRepeat = !this.withoutRepeat)}
          />
          <label htmlFor="withoutRepeat">Allow duplicate colors</label>
        </div>
        <hr />
        <div className="ui input">
          <input
            type="checkbox"
            id="strictOrder"
            name="flagType"
            checked={!this.strictOrder}
            onChange={() => (this.strictOrder = !this.strictOrder)}
          />
          <label htmlFor="duplicateColors">Allow transposition colors</label>
        </div>
        <hr />
        <div className="ui mini">
          <span className="ui large">Number of colors:</span>
          <div className="ui mini">
            <div className="ui big label">{this.colorNumbers.toString()}</div>
            <button
              className="ui mini button"
              onClick={() =>
                (this.colorNumbers = Math.min(
                  this.colorNumbers + 1,
                  this.props.colorsCount
                ))
              }
            >
              {" "}
              <i className="plus chevron icon"></i>
            </button>
            <button
              className="ui mini button"
              onClick={() =>
                (this.colorNumbers = Math.max(this.colorNumbers - 1, 1))
              }
            >
              {" "}
              <i className="minus chevron icon"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connector(FlagSettings);
