import {
  SHOW_ALERTS,
  REMOVE_ALERTS,
  NEW_CAR,
  NEW_CAR_SUCCESS,
  NEW_CAR_ERROR,
  UPDATE_CAR,
  UPDATE_CAR_SUCCESS,
  UPDATE_CAR_ERROR,
  SET_DELETE_CAR_MODAL,
  SET_CARS_SEARCHED,
  RESET_STATE,
  SET_CAR,
} from "../../types";

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case SHOW_ALERTS:
      return {
        ...state,
        alertMessage: action.payload,
      };
    case REMOVE_ALERTS:
      return {
        ...state,
        alertMessage: null,
      };
    case NEW_CAR:
      return {
        ...state,
        loading: true,
      };

    case NEW_CAR_SUCCESS:
      return {
        ...state,
        car: action.payload.data,
        message: { status: action.payload.status },
        loading: false,
      };
    case NEW_CAR_ERROR:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case UPDATE_CAR:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CAR_SUCCESS:
      return {
        ...state,
        car: action.payload.data,
        message: { status: action.payload.status },
        loading: false,
      };
    case UPDATE_CAR_ERROR:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case RESET_STATE:
      return {
        ...state,
        car: null,
        loading: false,
        deleteCarModal: {}
      };
    case SET_CAR:
      return {
        ...state,
        car: action.payload,
      };
    case SET_DELETE_CAR_MODAL: 
      return {
        ...state,
        deleteCarModal: action.payload
      }
    case SET_CARS_SEARCHED: 
      return {
        ...state,
        carsSearched: action.payload
      }
    default:
      return state;
  }
};

export default appReducer;
