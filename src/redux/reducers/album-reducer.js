import { GET_ALBUMS_LIST } from '../actions/album-actions';

// Initial state for albums
const INITIAL_STATE = {
    albums: []
}

export const albumReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_ALBUMS_LIST:
            return {...state, albums: action.payload};
        default:
            return state;
    }
}