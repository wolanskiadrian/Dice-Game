import {combineReducers} from 'redux';
import DiceReducer from './reducer_dice';
import PlayersNamesReducer from './reducer_players_names';
import GameReducer from './reducer_game';

const rootReducer = combineReducers({
    dice: DiceReducer,
    playersNames: PlayersNamesReducer,
    game: GameReducer
});

export default rootReducer;
