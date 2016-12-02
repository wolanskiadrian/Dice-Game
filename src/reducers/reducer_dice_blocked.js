export default function (state = false, action) {
    switch (action.type) {
        case 'CHANGE_DICE_STATUS':
            return action.payload;
    }

    return state;
}