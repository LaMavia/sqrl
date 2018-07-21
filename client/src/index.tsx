import React from 'react'
import ReactDOM from 'react-dom'

import {} from 'redux'
import {} from 'react-redux'

import App from "./App"

const root = document.getElementById("root")

root&&
  ReactDOM.render(<App/>, root)

if(!root) throw new Error("Root element not found!")