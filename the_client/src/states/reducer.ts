import { createAction, createReducer } from "@reduxjs/toolkit";
import ReduxActions from "../utils/ReduxActions";
import UserRoles from "../utils/UserRoles";
import { UserBoundaryImpl } from "../bounderies/user/UserBoundary";
import { ObjectBoundaryImpl } from "../bounderies/object/ObjectBoundary";

interface State {
  user: UserBoundaryImpl | null;
  token: string | null;
  mode: "light" | "dark";
  expiry: string | null;
  userRole: UserRoles;
  lastEditedItem: ObjectBoundaryImpl | null;
  lastAnswer: ObjectBoundaryImpl | null;
}

export type { State };

const initialState: State = {
  user: null,
  token: null,
  mode: "light",
  expiry: null,
  userRole: UserRoles.Participant,
  lastEditedItem: null,
  lastAnswer: null,
};

// Define actions
const logedIn = createAction<{
  user: UserBoundaryImpl;
  token: string;
  expiry: string;
}>(ReduxActions.LOGED_IN);

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
      state.expiry = action.payload.expiry;
      let role;
      switch (deepCopyUser.role) {
        case UserRoles.Admin:
          role = UserRoles.Admin;
          break;

        case UserRoles.Researcher:
          role = UserRoles.Researcher;
          break;

        case UserRoles.Participant:
          role = UserRoles.Participant;
          break;

        default:
          role = UserRoles.Participant;
          break;
      }
      state.userRole = role;
      return state;
    })
    .addCase(logedOut, (state) => {
      state.user = null;
      state.token = null;
      state.expiry = null;
      return state;
    })
    .addCase(answeredItem, (state, action) => {
      const deepCopyAnswer = { ...action.payload.lastAnswer };
      deepCopyAnswer.objectDetails = {
        ...action.payload.lastAnswer.objectDetails,
      };
      state.lastAnswer = deepCopyAnswer;
      return state;
    })
    .addCase(editedItem, (state, action) => {
      const deepCopyEditedItem = { ...action.payload.lastEditedItem };
      deepCopyEditedItem.objectDetails = {
        ...action.payload.lastEditedItem.objectDetails,
      };
      state.lastEditedItem = action.payload.lastEditedItem;
      return state;
    });
});

export default reducer;

export { logedIn, logedOut, answeredItem, editedItem };
