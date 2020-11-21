
import { combineReducers } from 'redux';
import colorItems from './colorItems';
import flagSettings from './flagSettings';


export enum ActionType {
    UPDATE_COLOR_ITEM,
    ADD_COLOR_ITEM,
    UPDATE_FLAG_SETTINGS
}

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    colorItems, flagSettings
})

export default rootReducer;