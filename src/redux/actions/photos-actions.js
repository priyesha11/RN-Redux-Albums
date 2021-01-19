import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONSTANTS } from '../../common/constants';
import { getCallApi } from '../../common/service';

export const GET_PHOTOS_LIST = 'get_photos_list';
export const UPDATE_PHOTOS_LIST = 'update_photos_list';
export const FILTER_PHOTOS_LIST = 'filter_photos_list';

const getPhotosList = (listData, wishList) => {
    return {
        type: GET_PHOTOS_LIST,
        payload: {listData, wishList}
    }
}

export const filterPhotosList = (query) => {
    return {
        type: FILTER_PHOTOS_LIST,
        payload: query
    }
}

export const fetchPhotoList = (albumId) => {
    return (dispatch) => {
        // Get photos list from API
        return getCallApi(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.ALBUM}/${albumId}/${CONSTANTS.PHOTOS_URL}`, 'GET').then((response) => {
            // Get existing wishlist stored
            AsyncStorage.getItem(CONSTANTS.WISHLIST_KEY).then((existingList) => {
                existingList = existingList ? JSON.parse(existingList) : [];
                dispatch(getPhotosList(response, existingList));
            });
        });
    }
}

export const updateList = (index) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_PHOTOS_LIST,
            payload: index
        })
    }
}