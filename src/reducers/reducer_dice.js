export default function (state = [], action) {
    switch (action.type) {
        case 'DICE_THROW':
            return action.payload;
        case 'DICE_RESET':
            return action.payload;
    }

    return state;
}