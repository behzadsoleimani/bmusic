import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import actions from "./actions";
import { IInitialState } from "./types";

const Context = createContext({});

function AppProvider({ children }: any) {
  const initialState: IInitialState = {
    playerId: "",
    isPlayerIdChanged: false
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ ...state, ...actions(dispatch) }}>
      {children}
    </Context.Provider>
  );
}
const AppStateValue: any = () => useContext(Context);
export { AppProvider, AppStateValue };
