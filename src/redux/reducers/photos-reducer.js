import { FILTER_PHOTOS_LIST, GET_PHOTOS_LIST, UPDATE_PHOTOS_LIST } from "../actions/photos-actions";

// Initial state for photos
const INITIAL_STATE = {
    photos: [],
    allPhotos: []
}

export const photosReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_PHOTOS_LIST:
            // Get wishlist data
            var wishList = action.payload.wishList;
            // Map photos data with existing wishlist
            var list = action.payload.listData.map((item) => {
                var index = wishList.findIndex((data) => data.id == item.id);
                if(index == -1){
                    return {...item, isWishListed: false};
                }else{
                    return {...item, isWishListed: true};
                }
            });
            // return new state
            return {...state, photos: list, allPhotos: list};
        case UPDATE_PHOTOS_LIST:
            var temp = [...state.photos];
            // Toggle wish list status
            temp[action.payload].isWishListed = !temp[action.payload].isWishListed;
            return {...state, photos: temp, allPhotos: temp};
        case FILTER_PHOTOS_LIST:
            var temp = [...state.allPhotos];
            // Filter allPhotos with search query
            temp = temp.filter((item) => item.title.includes(action.payload));
            return {...state, photos: temp};
        default:
            return state;
    }
}