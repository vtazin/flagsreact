import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/reducers";
import { INITIAL_STATE } from "./store/reducers/colorItems";

// const composeEnhancers =
//   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || function () {};

// ReactDOM.render(
//   <Provider
//     store={createStore(
//       rootReducer,
//       { colorItems: INITIAL_STATE },
//       composeEnhancers()
//     )}
//   >
//     <App />
//   </Provider>,
//   document.querySelector("#root")
// );

import { takeALongTimeToDoSomething } from "./worker";

// ...

console.log("Do something");
takeALongTimeToDoSomething();
console.log("Do another thing");
