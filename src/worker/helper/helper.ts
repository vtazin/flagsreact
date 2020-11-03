import { ColorItem } from '../../store/reducers/colorItems';

import { ColorRGBA } from '../../components/Canvas/SimpleWebGL'

export type FlagColor = {
  name: string;
  color: ColorRGBA;
}

export default class HelperWorker {
  static fillSet(flagSettings: any, colorItems: ColorItem[]) {
    console.log("Start our long running job...");


    const resultDictionary: { [key: string]: FlagColor[] } = {};


    HelperWorker.fillFunc([], resultDictionary, 0, flagSettings, colorItems);


    return resultDictionary;
  }


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
        if (flagSettings.strictOrder) {
          indexes.sort();
        }
        const index = indexes.join("_");
        if (!resultDictionary.hasOwnProperty(index))
          resultDictionary[index] = indexes.map(
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

    let colorNumericR = parseInt(color.substr(0, 2), 16); // convert to integer
    let colorNumericG = parseInt(color.substr(2, 2), 16); // convert to integer
    let colorNumericB = parseInt(color.substr(4, 2), 16); // convert to integer

    return [colorNumericR, colorNumericG, colorNumericB, 1];
  }

}