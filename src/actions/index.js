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

export function setGameObject(gameArray) {
    return {
        type: 'SET_GAME_OBJECT',
        payload: gameArray
    }
}

export function diceBlock(status) {
    return {
        type: 'CHANGE_DICE_STATUS',
        payload: status
    }
}

export function resetDice(diceArray) {
    return {
        type: 'DICE_RESET',
        payload: diceArray
    }
}

export function resetDices(dices) {
    return {
        type: 'DICES_RESET',
        payload: dices
    }
}