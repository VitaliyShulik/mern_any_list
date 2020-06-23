import { 
    GET_ITEMS, 
    ADD_ITEM,
    TOGGLE_IS_COMPLETED_ITEM, 
    DELETE_ITEM, 
    ITEMS_LOADING,
} from '../actions/types';


const initialState = {
    items: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:        
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case TOGGLE_IS_COMPLETED_ITEM:
            state.items.forEach(item => {
                if (item._id === action.payload._id) {
                    item.isCompleted = !item.isCompleted;
                };
            });
            return {
                ...state,
                items: [...state.items],
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}