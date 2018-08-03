import React from "react"
import { State } from "../store"
import { UserState } from "../reducers/user.reducer"
import { Redirect } from "react-router-dom"
import { Dispatch } from "redux";
import { connect } from "react-redux";

interface Props {
  user: UserState
}
const connectedHome = ({user}: Props) => {

  return !user.loggedIn 
    ? <Redirect to="/login"/> 
    : (
      <main className="home">
        
      </main>
    ) 
}

const mapStateToProps = (state: State) => ({
  user: state.user
})
const mapDispatchToProps = (_dispatch: Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(connectedHome)