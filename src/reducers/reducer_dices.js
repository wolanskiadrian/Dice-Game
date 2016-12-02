export default function (state = [], action) {
    switch (action.type) {
        case 'DICES_RESET':
            return action.payload;
    }

    return state;
}