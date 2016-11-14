import { combineReducers } from 'redux';
import DiceReducer from './reducer_dice';

const rootReducer = combineReducers({
  dice: DiceReducer
});

export default rootReducer;
