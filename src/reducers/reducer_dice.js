export default function (state = [], action) {
    switch (action.type) {
        case 'DICE_THROW':
            return action.payload;
    }

    return state;
}