
import { combineReducers } from 'redux';
import colorItems from './colorItems';

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    colorItems
})

export default rootReducer;