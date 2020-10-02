import { ActionType } from ".";
import { ColorList } from "../../resources/colorList";

export type ColorItem = {
    name: string;
    checked: boolean;
    colorValue: string;
};

type ColorItemAction = {
    type: ActionType,
    payload: ColorItem
}

const INITIAL_CHECKED = [0, 2, 4, 6];

export const INITIAL_STATE: ColorItem[] = Object.keys(ColorList).map(
    (name, index) => ({
        name,
        checked: INITIAL_CHECKED.includes(index),
        colorValue: ColorList[name],
    })
);

export default function (state: ColorItem[] = [], action: ColorItemAction) {

    switch (action.type) {
        case ActionType.ADD_COLOR_ITEM:
            return [...state, action.payload];
        case ActionType.UPDATE_COLOR_ITEM:
            return state.map((item) => {
                if (item.name === action.payload.name) {
                    return action.payload;
                }
                return item;
            })
        default:
            return state;
    }
}