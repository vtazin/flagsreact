import React, { Component } from "react";

type FlagElementProps = {
  colorList: string[];
};

class FlagElement extends Component<FlagElementProps> {
  render() {
    return (
      <div>
        <div
          style={{
            border: "solid 1px",
          }}
        >
          {this.props.colorList.map((colorVal, i) => {
            return (
              <div
                style={{
                  height: "4px",
                  width: "16px",
                  backgroundColor: colorVal,
                }}
                key={colorVal + i}
              />
            );
          })}
        </div>
        <br />
      </div>
    );
  }
}

export default FlagElement;
