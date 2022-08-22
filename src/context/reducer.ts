import { IInitialState } from "./types";

const reducer = (state: IInitialState, action: any) => {
  switch (action.type) {
    case "SET_PLAYER_ID":
      return { ...state, playerId: action.playerId };

    case "SET_IS_PLAYER_ID_CHANGED":
      return { ...state, isPlayerIdChanged: true };

    default:
      return state;
  }
};

export default reducer;
