export default function (state = [], action) {
    switch (action.type) {
        case 'SET_GAME_OBJECT':
            return action.payload;
    }

    return state;
}