// TODO: implement

import { GET_LIST_MESSAGES, CREATE_MESSAGE } from "../actions";

const INITIAL_STATE = {
  messages: [],
};

export const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST_MESSAGES: {
      const { messages } = action.payload;
      return {
        ...state,
        messages,
      };
    }
    case CREATE_MESSAGE: {
      const { message } = action.payload;
      return {
        ...state,
        messages: [...state.messages, message],
      };
    }
    default:
      return state;
  }
};
