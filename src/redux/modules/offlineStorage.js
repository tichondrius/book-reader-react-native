export const ADD_STORE_OFFLINE = 'offlineStorage/ADD_STORE';
export const REMOVE_STORE_OFFLINE = 'offlineStorage/REMOVE_STORE';

const initState = {
    categories: [],

}
export default function(state = initState, actions) {
    switch(actions.type){
        case ADD_STORE_OFFLINE:
            break;
        case REMOVE_STORE_OFFLINE:
            break;
    }
} 