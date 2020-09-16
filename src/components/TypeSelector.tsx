import React, { Component, ChangeEvent } from "react";

enum FlagColorType {
  DUPLICATE = "duplicate",
  STRICT = "strict",
}

export default class TypeSelector extends Component {
  state = {
    colorType: FlagColorType.DUPLICATE,
  };

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
          checked={this.state.colorType === FlagColorType.DUPLICATE}
        />
        <label htmlFor="flagTypeDuplicate">Allow duplicate color</label>
        <input
          type="radio"
          id="flagTypeStrict"
          name="flagType"
          value={FlagColorType.STRICT}
          onChange={this.onChange}
          checked={this.state.colorType === FlagColorType.STRICT}
        />
        <label htmlFor="flagTypeStrict">Strict color</label>
      </div>
    );
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ colorType: e.target.value as FlagColorType });
    console.log(this.state.colorType);
  };
}
