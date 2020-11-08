import React, { Component, RefObject } from "react";

import { FlagColor } from "../../worker/helper/helper";

import SimpleEngine, { MeshType } from "./SimpleWebGL";

type Props = {
  flagList: FlagColor[][];
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
  }

  componentDidUpdate() {
    if (this.props.flagList.length > 0) {
      SimpleEngine.setMesh(this.createMesh());
    }
  }

  createMesh() {
    const flagCount = this.props.flagList.length;
    let width = 1;
    let height = 1;

    const aInstancedLeftBottom = [];
    const aInstancedColor = [];
    if (flagCount > 0) {
      width = 0.6667 / Math.ceil(Math.sqrt(flagCount));

      const flagRadius = width / Math.SQRT2;

      const flag = this.props.flagList[0];
      height = width / flag.length;
      for (let i = 0; i < flag.length; i++) {
        aInstancedLeftBottom.push([0, 0, 0, -height + height * i] as [
          number,
          number,
          number,
          number
        ]);
        aInstancedColor.push(flag[i].color);
      }

      let count = 1,
        level = 0;
      while (count < flagCount) {
        level++;
        const centerRadius = flagRadius * 2.25 * level;
        const itemsOnRadius = Math.ceil(
          (Math.PI * 2) / (6 * Math.asin((0.5 * flagRadius) / centerRadius))
        );
        const rotationSpeed = Math.random();

        const curCount = Math.min(flagCount, count + itemsOnRadius);
        let n = 0;

        const alpha =
          (2 * Math.PI) / Math.min(itemsOnRadius, flagCount - count);

        for (let j = count; j < curCount; j++) {
          const flag = this.props.flagList[j];

          for (let i = 0; i < flag.length; i++) {
            aInstancedLeftBottom.push([
              centerRadius,
              n * alpha,
              -height + height * i,
              rotationSpeed,
            ] as [number, number, number, number]);
            aInstancedColor.push(flag[i].color);
          }
          n++;
        }

        count += itemsOnRadius;
      }
    }

    const mesh: MeshType = {
      aPosition: [
        [-width * 0.5, -height * 0.5],
        [width * 0.5, -height * 0.5],
        [width * 0.5, height * 0.5],
        [-width * 0.5, height * 0.5],
      ],
      aInstancedLeftBottom,
      aInstancedColor,
    };

    return mesh;
  }

  render() {
    return <canvas width={640} height={640} ref={this.myRef}></canvas>;
  }
}

export default CanvasPlane;
