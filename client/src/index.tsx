import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import {store} from "./store"
import App from "./App"

const root = document.getElementById("root")

root && ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), root)

if (!root) throw new Error("Root element not found!")
