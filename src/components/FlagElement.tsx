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
            width: "90px",
            border: "solid",
          }}
        >
          {this.props.colorList.map((colorVal) => {
            return (
              <div
                style={{
                  height: "30px",
                  width: "90px",
                  backgroundColor: colorVal,
                }}
                key={colorVal}
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
