
import { transfer } from 'comlink';
import { ColorRGBA, MeshType } from '../../components/Canvas/SimpleWebGL'

export type FlagColor = {
  name: string;
  color: ColorRGBA;
}

export type MeshDescription = {
  colorOffset: number;
  leftBottomOffset: number;
  count: number;
  itemsCount: number;
  arrayBuffer: ArrayBuffer;
}

export default class HelperWorker {
  static fillSet(flagSettings: any, colorItems: number[]) {

    const resultDictionary: { [key: string]: number[] } = {};

    HelperWorker.fillFunc([], resultDictionary, 0, flagSettings, colorItems);

    let flagList: number[][] = [];
    for (const key in resultDictionary) {
      flagList.push(resultDictionary[key]);
    }
    flagList = flagList.sort(() => (Math.random() > 0.5 ? 1 : -1));
    const result = this.createArrayBuffer(flagList);

    return result;

  }

  private static createArrayBuffer(flagList: number[][]): MeshDescription {
    const count = flagList.length;
    const mesh = this.createMesh(flagList);
    const bufferArray: number[] = [];
    for (let i = 0; i < mesh.aPosition.length; i++) {
      const position = mesh.aPosition[i];
      bufferArray.push(...position);
    }

    const colorOffset = bufferArray.length * 4;
    for (let i = 0; i < mesh.aInstancedColor.length; i++) {
      bufferArray.push(mesh.aInstancedColor[i]);
    }
    const leftBottomOffset = bufferArray.length * 4;
    for (let i = 0; i < mesh.aInstancedLeftBottom.length; i++) {
      bufferArray.push(...mesh.aInstancedLeftBottom[i]);
    }

    const result = new Float32Array(bufferArray);

    return { colorOffset, leftBottomOffset, count, itemsCount: mesh.aInstancedColor.length, arrayBuffer: transfer(result.buffer, [result.buffer]) };
  }

  private static createMesh(flagList: number[][]) {
    const flagCount = flagList.length;
    let width = 1;
    let height = 1;

    const aInstancedLeftBottom: [number, number, number, number][] = [];
    const aInstancedColor = [];
    if (flagCount > 0) {
      width = 0.6667 / Math.ceil(Math.sqrt(flagCount));

      const flagRadius = width / Math.SQRT2;

      const flag = flagList[0];
      height = width / flag.length;
      for (let i = 0; i < flag.length; i++) {
        aInstancedLeftBottom.push([0, 0, -height + height * i, 0]);
        aInstancedColor.push(flag[i]);
      }

      let count = 1,
        level = 0,
        sign = 1;
      while (count < flagCount) {
        level++;
        const centerRadius = flagRadius * 2.25 * level;
        const itemsOnRadius = Math.ceil(
          (Math.PI * 2) / (6 * Math.asin((0.5 * flagRadius) / centerRadius))
        );
        const rotationSpeed = sign * Math.random();
        sign = -sign;
        const curCount = Math.min(flagCount, count + itemsOnRadius);
        let n = 0;

        const alpha =
          (2 * Math.PI) / Math.min(itemsOnRadius, flagCount - count);

        for (let j = count; j < curCount; j++) {
          const flag = flagList[j];

          for (let i = 0; i < flag.length; i++) {
            aInstancedLeftBottom.push([
              centerRadius,
              n * alpha,
              -height + height * i,
              rotationSpeed,
            ]);
            aInstancedColor.push(flag[i]);
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

  private static curIndexes: number[] = [];

  private static fillFunc(
    indexes: number[],
    resultDictionary: { [key: string]: number[] },
    n: number, flagSettings: any, colorItems: number[]
  ) {
    const fillFlag = n >= flagSettings.colorNumbers - 1;
    const colorItemList = colorItems;
    for (let i = 0; i < colorItemList.length; i++) {
      if (flagSettings.withoutRepeat && indexes.includes(i)) {
        continue;
      }
      indexes[n] = i;
      if (fillFlag) {

        for (let j = 0; j < indexes.length; j++) {
          this.curIndexes[j] = indexes[j];
        }
        if (flagSettings.strictOrder) {
          this.curIndexes.sort();
        }

        const index = this.curIndexes.join("_");
        if (!resultDictionary[index])
          resultDictionary[index] = this.curIndexes.map(index => colorItemList[index]);
      } else {
        HelperWorker.fillFunc(indexes, resultDictionary, n + 1, flagSettings, colorItems);
      }
    }
    indexes.length = n;
  };

}