import { ActionType } from ".";

const INITIAL_STATE = {
    withoutRepeat: true,
    strictOrder: true
};


export interface FlagSettings {
    withoutRepeat?: boolean;
    strictOrder?: boolean;
}

type FlagSettingsAction = {
    type: ActionType,
    payload: FlagSettings
}


export default function (state = INITIAL_STATE, action: FlagSettingsAction) {

    switch (action.type) {
        case ActionType.UPDATE_FLAG_SETTINGS:
            return state = { ...state, ...action.payload };
        default:
            return state;
    }
}