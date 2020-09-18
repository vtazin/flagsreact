import React, { Component, ChangeEvent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../reducers";
import { FlagColorType } from "../reducers/colorType";
import { updateColorType } from "../actions";

const mapStateToProps = (state: RootState) => {
  return {
    colorType: state.colorType,
  };
};
const connector = connect(mapStateToProps, { updateColorType });

class TypeSelector extends Component<ConnectedProps<typeof connector>> {
  render() {
    return (
      <div>
        <p>Choose template:</p>
        <input
          type="radio"
          id="flagTypeDuplicate"
          name="flagType"
          value={FlagColorType.DUPLICATE}
          onChange={this.onChange}
          checked={this.props.colorType === FlagColorType.DUPLICATE}
        />
        <label htmlFor="flagTypeDuplicate">Allow duplicate color</label>
        <input
          type="radio"
          id="flagTypeStrict"
          name="flagType"
          value={FlagColorType.STRICT}
          onChange={this.onChange}
          checked={this.props.colorType === FlagColorType.STRICT}
        />
        <label htmlFor="flagTypeStrict">Strict color</label>
      </div>
    );
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.updateColorType(e.target.value as FlagColorType);
  };
}

export default connector(TypeSelector);
