import { UPDATE_WISHLIST, GET_WISHLIST } from "../actions/wishlist-actions";

// Initial state for wishlist
const INITIAL_STATE = {
    wishList: []
}

export const wishListReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_WISHLIST:
            return {...state, wishList: action.payload};
        case UPDATE_WISHLIST:
            return {...state, wishList: action.payload};
        default:
            return state;
    }
}