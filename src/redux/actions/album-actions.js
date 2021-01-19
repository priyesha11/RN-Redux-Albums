import { CONSTANTS } from '../../common/constants';
import { getCallApi } from '../../common/service';

export const GET_ALBUMS_LIST = 'get_albums_list';

export const getAlbumList = (listData) => {
    return {
        type: GET_ALBUMS_LIST,
        payload: listData
    }
}

export const fetchAlbumList = () => {
    return (dispatch) => {
        // Get albums list from API
        return getCallApi(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.ALBUMS_URL}`, 'GET').then((response) => {
            dispatch(getAlbumList(response));
        });
    }
}