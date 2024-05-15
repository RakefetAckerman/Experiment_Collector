import { createAction, createReducer } from "@reduxjs/toolkit";
import ReduxActions from "../utils/ReduxActions";
import UserRoles from "../utils/UserRoles";
import { UserBoundaryImpl } from "../bounderies/user/UserBoundary";
import { ObjectBoundaryImpl } from "../bounderies/object/ObjectBoundary";

interface State {
  user: UserBoundaryImpl | null;
  token: string | null;
  mode: "light" | "dark";
  userRole: UserRoles;
  lastEditedItem: ObjectBoundaryImpl | null;
  lastAnswer: ObjectBoundaryImpl | null;
}

const initialState: State = {
  user: null,
  token: null,
  mode: "light",
  userRole: UserRoles.Participant,
  lastEditedItem: null,
  lastAnswer: null,
};

// Define actions
const logedIn = createAction<{ user: UserBoundaryImpl; token: string }>(
  ReduxActions.LOGED_IN
);
const logedOut = createAction<void>(ReduxActions.LOGED_OUT);
const answeredItem = createAction<{ lastAnswer: ObjectBoundaryImpl }>(
  ReduxActions.ANSWERED_ITEM
);
const editedItem = createAction<{ lastEditedItem: ObjectBoundaryImpl }>(
  ReduxActions.EDITED_ITEM
);

// Create reducer
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(logedIn, (state, action) => {
      const deepCopyUser = { ...action.payload.user };
      deepCopyUser.userDetails = { ...action.payload.user.userDetails };
      state.user = deepCopyUser;
      state.token = action.payload.token;
    })
    .addCase(logedOut, (state) => {
      state.user = null;
      state.token = null;
    })
    .addCase(answeredItem, (state, action) => {
      const deepCopyAnswer = { ...action.payload.lastAnswer };
      deepCopyAnswer.objectDetails = {
        ...action.payload.lastAnswer.objectDetails,
      };
      state.lastAnswer = deepCopyAnswer;
    })
    .addCase(editedItem, (state, action) => {
      const deepCopyEditedItem = { ...action.payload.lastEditedItem };
      deepCopyEditedItem.objectDetails = {
        ...action.payload.lastEditedItem.objectDetails,
      };
      state.lastEditedItem = action.payload.lastEditedItem;
    });
});

export default reducer;
