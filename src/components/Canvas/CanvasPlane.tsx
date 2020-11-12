import React, { Component, RefObject } from "react";
import { MeshDescription } from "../../worker/helper/helper";

import SimpleEngine, { ColorRGBA } from "./SimpleWebGL";

type Props = {
  description: MeshDescription;
  colorList: ColorRGBA[];
};

class CanvasPlane extends Component<Props> {
  myRef: RefObject<HTMLCanvasElement>;

  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    const canvas = this.myRef.current!;
    SimpleEngine.create(canvas);
    SimpleEngine.setColorList(this.props.colorList);
  }

  componentDidUpdate() {
    if (this.props.description) {
      SimpleEngine.setMeshDescription(this.props.description);
    }
  }

  render() {
    return <canvas width={640} height={640} ref={this.myRef}></canvas>;
  }
}

export default CanvasPlane;
