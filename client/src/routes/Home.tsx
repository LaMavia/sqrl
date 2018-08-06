import React from "react"
import { State } from "../store"
import { UserState } from "../reducers/user.reducer"
import {
  getUser
} from "../actions/user.actions"
import { Redirect } from "react-router-dom"
import { Dispatch } from "redux";
import { connect } from "react-redux";

interface Props {
  user: UserState
  login: (username: string, password: string) => any
}
const connectedHome = ({user}: Props) => {
  return !user.me
    ? <Redirect to="/login"/> 
    : (
      <main className="home">
        
      </main>
    ) 
}

const mapStateToProps = (state: State) => ({
  user: state.user
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (id: string) => {
    dispatch(getUser(`${location.origin}/graphql`, `_id: "${id}"`)(dispatch))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(connectedHome)