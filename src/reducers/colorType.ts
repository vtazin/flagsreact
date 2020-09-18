import { ActionType } from ".";

export enum FlagColorType {
    DUPLICATE = "duplicate",
    STRICT = "strict",
}


const INITIAL_STATE: FlagColorType = FlagColorType.STRICT;


type ColorTypeAction = {
    type: ActionType,
    payload: FlagColorType
}


export default function (state = INITIAL_STATE, action: ColorTypeAction) {

    switch (action.type) {
        case ActionType.UPDATE_COLOR_TYPE:
            return state = action.payload;
        default:
            return state;
    }
}