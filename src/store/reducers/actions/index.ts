import { ActionType } from "..";
import { ColorItem } from "../colorItems";
import { FlagSettings } from "../flagSettings";

export const addColorItem = (item: ColorItem) => ({
    type: ActionType.ADD_COLOR_ITEM,
    payload: item
})

export const updateColorItem = (item: ColorItem) => ({
    type: ActionType.UPDATE_COLOR_ITEM,
    payload: item
})

export const updateFlagSettings = (value: FlagSettings) => ({
    type: ActionType.UPDATE_FLAG_SETTINGS,
    payload: value
})
