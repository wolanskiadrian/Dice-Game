import {combineReducers} from 'redux';
import DiceReducer from './reducer_dice';
import PlayersNamesReducer from './reducer_players_names';
import GameReducer from './reducer_game';
import DiceBlocked from './reducer_dice_blocked';
import DicesReset from './reducer_dices';

const rootReducer = combineReducers({
    dice: DiceReducer,
    playersNames: PlayersNamesReducer,
    game: GameReducer,
    diceBlocked: DiceBlocked,
    dices: DicesReset
});

export default rootReducer;
