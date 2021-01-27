export const SET_RESTAURANTS = 'lunchTime/SET_RESTAURANTS';

export const initialState = {
  restaurants: []
};

export const lunchTymeReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case SET_RESTAURANTS:
        return {
          ...state,
          restaurants: action.restaurants
        };
      default:
        return state;
    }
};

export const setRestaurants = (restaurants) => ({
  type: SET_RESTAURANTS,
  restaurants
});

export default lunchTymeReducer;
