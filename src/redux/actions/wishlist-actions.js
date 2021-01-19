import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONSTANTS } from "../../common/constants";

export const UPDATE_WISHLIST = 'update_wishlist';
export const GET_WISHLIST = 'get_wishlist';

const updateWishList = (list) => {
    return {
        type: UPDATE_WISHLIST,
        payload: list
    }
}

export const storeInWishList = (item) => {
    return (dispatch) => {
        // Get existing wishlist data
        AsyncStorage.getItem(CONSTANTS.WISHLIST_KEY).then((wishList) => {
            wishList = wishList ? JSON.parse(wishList) : []; 
            // It item is alreayd wishlisted
            if(item.isWishListed){
                var index = wishList.findIndex(data => data.id == item.id);
                // Remove it from storage
                if(index != -1){
                    wishList.splice(index, 1);
                }
            }else{
                // Else push in storage
                item.isWishListed = true;
                wishList.push(item);
            }
            // Update async storage with updated data
            AsyncStorage.setItem(CONSTANTS.WISHLIST_KEY, JSON.stringify(wishList)).then(() => {
                dispatch(updateWishList(wishList));
            });
        });
    }
}

export const getWishList = () => {
    return (dispatch) => {
        // Return whole wishlist data
        AsyncStorage.getItem(CONSTANTS.WISHLIST_KEY).then((wishList) => {
            wishList = wishList ? JSON.parse(wishList) : []; 
            dispatch({
                type: GET_WISHLIST,
                payload: wishList
            })
        });
    }
}