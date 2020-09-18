
import { combineReducers } from 'redux';
import colorItems from './colorItems';
import colorType from './colorType';

export enum ActionType {
    UPDATE_COLOR_ITEM = "UPDATE_COLOR_ITEM",
    ADD_COLOR_ITEM = "ADD_COLOR_ITEM",
    UPDATE_COLOR_TYPE = "UPDATE_COLOR_TYPE"
}

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    colorItems, colorType
})

export default rootReducer;