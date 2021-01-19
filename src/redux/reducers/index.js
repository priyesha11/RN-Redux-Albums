import { combineReducers } from "redux";
import { albumReducer } from "./album-reducer";
import { photosReducer } from "./photos-reducer";
import { wishListReducer } from "./wishlist-reducer";

// Combines all the reducers in single reducer
const rootReducer = combineReducers({
    albumData: albumReducer,
    photosData: photosReducer,
    wishlistData: wishListReducer
});

export default rootReducer;