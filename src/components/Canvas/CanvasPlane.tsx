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
    window.onresize = this.resizeCanvas;
  }
  componentDidMount() {
    const canvas = this.myRef.current!;
    SimpleEngine.create(canvas);
    this.resizeCanvas();

    SimpleEngine.setColorList(this.props.colorList);
  }

  resizeCanvas = () => {
    const canvas = this.myRef.current;
    if (canvas) {
      const parent = canvas.parentElement!;
      const minParentDimension = Math.min(
        parent.clientHeight,
        parent.clientWidth
      );
      const devicePixelRatio = window["devicePixelRatio"] || 1;
      canvas.style.width = minParentDimension + "px";
      canvas.style.height = minParentDimension - canvas.offsetTop + "px";

      canvas.width = minParentDimension * devicePixelRatio;
      canvas.height =
        (minParentDimension - canvas.offsetTop) * devicePixelRatio;

      SimpleEngine.context?.resize();
    }
  };

  componentDidUpdate() {
    if (this.props.description) {
      SimpleEngine.setMeshDescription(this.props.description);
    }
  }

  render() {
    return <canvas ref={this.myRef}></canvas>;
  }
}

export default CanvasPlane;
