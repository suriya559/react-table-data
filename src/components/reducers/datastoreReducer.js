import types from "../actions";

const initialState = {
  details: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_DATA: {
      let k = state.details;
      k.push(action.data);
      return {
        ...state,
        details: k,
      };
    }
  }
  return state;
};
