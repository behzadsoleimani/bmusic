const actions = (dispatch: any) => ({

  setPlayerId: (playerId: string) => dispatch({
    type: "SET_PLAYER_ID",
    playerId
  }),
  setIsPlayerIdChanged: () => dispatch({
    type: "SET_IS_PLAYER_ID_CHANGED",
  }),



})

export default actions