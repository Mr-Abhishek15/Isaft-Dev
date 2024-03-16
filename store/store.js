import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./userReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer, // This will create a state slice named 'user' handled by userReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
