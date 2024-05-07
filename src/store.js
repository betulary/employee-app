import { createStore } from 'redux';

const initialState = {
  votes: {},
  betul: 'arrryy'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return {
        ...state,
        votes: {
          ...state.votes,
          [action.payload.id]: (state.votes[action.payload.id] || 0) + 1,
        },
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
