import { ColorItem } from "../components/ColorTable";
import { ActionType } from "../reducers";
import { FlagColorType } from "../reducers/colorType";

export const addColorItem = (item: ColorItem) => {
    return {
        type: ActionType.ADD_COLOR_ITEM,
        payload: item
    }
}

export const updateColorItem = (item: ColorItem) => {
    return {
        type: ActionType.UPDATE_COLOR_ITEM,
        payload: item
    }
}
export const updateColorType = (flag: FlagColorType) => {
    return {
        type: ActionType.UPDATE_COLOR_TYPE,
        payload: flag
    }
}
