import { ColorItem } from '../../store/reducers/colorItems';

export default class HelperWorker {
  static fillSet(flagSettings: any, colorItems: ColorItem[]) {
    console.log("Start our long running job...");


    const resultDictionary: { [key: string]: ColorItem[] } = {};


    HelperWorker.fillFunc([], resultDictionary, 0, flagSettings, colorItems);


    return resultDictionary;
  }


  private static fillFunc(
    indexes: number[],
    resultDictionary: { [key: string]: ColorItem[] },
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
            (index) => colorItemList[index]
          );
      } else {
        HelperWorker.fillFunc(indexes, resultDictionary, n + 1, flagSettings, colorItems);
      }
    }
    indexes.length = n;
  };

}