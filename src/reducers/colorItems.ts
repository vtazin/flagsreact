import { ActionType } from ".";
import { ColorItem } from "../components/ColorTable";

const INITIAL_STATE: ColorItem[] = [];



type ColorItemAction = {
    type: ActionType,
    payload: ColorItem
}


export default function (state = INITIAL_STATE, action: ColorItemAction) {

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