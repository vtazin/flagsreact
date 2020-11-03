import React, { Component, RefObject } from "react";

import { FlagColor } from "../../worker/helper/helper";

import SimpleEngine, { MeshType } from "./SimpleWebGL";

type Props = {
  flagList: FlagColor[][];
};

class CanvasPlane extends Component<Props> {
  myRef: RefObject<HTMLCanvasElement>;

  engine!: SimpleEngine;

  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    const canvas = this.myRef.current!;
    this.engine = new SimpleEngine(canvas);
  }

  componentDidUpdate() {
    if (this.props.flagList.length > 0 && this.props.flagList[0].length > 0) {
      this.engine.setCleanColor(this.props.flagList[0][0].color);
      const mesh: MeshType = {
        aPosition: [
          [0, 0],
          [0.1, 0],
          [0.1, 0.1],
          [0, 0.1],
        ],
        indices: [0, 1, 2, 0, 2, 3],
        aInstansedLeftBottom: [[0, 0]],
        aInstancedColor: [[1, 0, 0, 1]],
      };
      this.engine.setMesh(mesh);
    }
  }

  render() {
    return <canvas ref={this.myRef}></canvas>;
  }
}

export default CanvasPlane;
