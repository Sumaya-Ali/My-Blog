/*
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
*/
import { configureStore } from '@reduxjs/toolkit'
import IdsReducer from '../redux/reducers/main'

export default configureStore({
    reducer: {
    Ids : IdsReducer
    }
  })


/*
const middleware = [thunk];

const makeStore = () => createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)));

export const wrapper = createWrapper(makeStore);
*/