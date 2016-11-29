export function diceCatch(dice) {
    return {
        type: 'DICE_THROW',
        payload: dice
    };
}

export function setPlayersNames(playersNames) {
    return {
        type: 'SET_PLAYERS_NAMES',
        payload: playersNames
    }
}