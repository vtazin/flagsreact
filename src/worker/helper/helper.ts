import { ColorItem } from '../../store/reducers/colorItems';
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
  static fillSet(flagSettings: any, colorItems: ColorItem[]) {
    console.log("Start our long running job...");
    const startTime = Date.now();

    const resultDictionary: { [key: string]: FlagColor[] } = {};

    HelperWorker.fillFunc([], resultDictionary, 0, flagSettings, colorItems);

    let flagList: FlagColor[][] = [];
    for (const key in resultDictionary) {
      flagList.push(resultDictionary[key]);
    }
    flagList = flagList.sort(() => (Math.random() > 0.5 ? 1 : -1));
    const result = this.createArrayBuffer(flagList);
    console.log((Date.now() - startTime) / 1000);
    return result;

  }

  private static createArrayBuffer(flagList: FlagColor[][]): MeshDescription {
    const count = flagList.length;
    const mesh = this.createMesh(flagList);
    const bufferArray: number[] = [];
    for (let i = 0; i < mesh.aPosition.length; i++) {
      const position = mesh.aPosition[i];
      bufferArray.push(...position);
    }

    const colorOffset = bufferArray.length * 4;
    for (let i = 0; i < mesh.aInstancedColor.length; i++) {
      bufferArray.push(...mesh.aInstancedColor[i]);
    }
    const leftBottomOffset = bufferArray.length * 4;
    for (let i = 0; i < mesh.aInstancedLeftBottom.length; i++) {
      bufferArray.push(...mesh.aInstancedLeftBottom[i]);
    }

    const result = new Float32Array(bufferArray);

    return { colorOffset, leftBottomOffset, count, itemsCount: mesh.aInstancedColor.length, arrayBuffer: transfer(result.buffer, [result.buffer]) };
  }

  private static createMesh(flagList: FlagColor[][]) {
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
        aInstancedColor.push(flag[i].color);
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

  private static curIndexes: number[] = [];

  private static fillFunc(
    indexes: number[],
    resultDictionary: { [key: string]: FlagColor[] },
    n: number, flagSettings: any, colorItems: ColorItem[]
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
          resultDictionary[index] = this.curIndexes.map(
            (index) => {
              const colorItem = colorItemList[index];
              return { name: colorItem.name, color: this.convertColor(colorItem.colorValue) }
            }
          );
      } else {
        HelperWorker.fillFunc(indexes, resultDictionary, n + 1, flagSettings, colorItems);
      }
    }
    indexes.length = n;
  };

  private static convertColor(colorValue: string): ColorRGBA {
    let color = colorValue;
    color = color.substring(1); // remove #

    let colorNumericR = parseInt(color.substr(0, 2), 16) / 255; // convert to integer
    let colorNumericG = parseInt(color.substr(2, 2), 16) / 255; // convert to integer
    let colorNumericB = parseInt(color.substr(4, 2), 16) / 255; // convert to integer

    return [colorNumericR, colorNumericG, colorNumericB, 1];
  }

}