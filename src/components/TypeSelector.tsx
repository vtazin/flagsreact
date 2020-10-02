import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/reducers";
import { updateFlagSettings } from "../store/reducers/actions";

const mapStateToProps = (state: RootState) => {
  return {
    flagSettings: state.flagSettings,
  };
};
const connector = connect(mapStateToProps, { updateFlagSettings });

class TypeSelector extends Component<ConnectedProps<typeof connector>> {
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

  render() {
    return (
      <div>
        <p>Choose template:</p>
        <input
          type="checkbox"
          id="withoutRepeat"
          name="flagType"
          checked={!this.withoutRepeat}
          onChange={() => (this.withoutRepeat = !this.withoutRepeat)}
        />
        <label htmlFor="withoutRepeat">Allow duplicate colors</label>
        <br />
        <input
          type="checkbox"
          id="strictOrder"
          name="flagType"
          checked={!this.strictOrder}
          onChange={() => (this.strictOrder = !this.strictOrder)}
        />
        <label htmlFor="duplicateColors">Allow transposition colors</label>
      </div>
    );
  }
}

export default connector(TypeSelector);
