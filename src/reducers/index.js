import { combineReducers } from 'redux';
import DiceReducer from './reducer_dice';
import PlayersNamesReducer from './reducer_players_names'

const rootReducer = combineReducers({
  dice: DiceReducer,
  playersNames: PlayersNamesReducer
});

export default rootReducer;
