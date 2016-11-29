export default function (state = [], action) {
    switch (action.type) {
        case 'SET_PLAYERS_NAMES':
            return action.payload;
    }

    return state;
}