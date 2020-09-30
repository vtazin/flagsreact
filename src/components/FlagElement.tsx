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
            border: "solid",
          }}
        >
          {this.props.colorList.map((colorVal, i) => {
            return (
              <div
                style={{
                  height: "6px",
                  width: "24px",
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
