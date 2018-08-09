import React from "react"
import { State } from "../store"
import { UserState } from "../reducers/user.reducer"
import { Redirect } from "react-router-dom"
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Posts } from "../components/PostsSection";


interface Props {
  user: UserState
}
const connectedHome = ({user}: Props) => {
  if(!user.me) return <Redirect to="/login"/> 

  return (
      <main className="home">
        <Posts />
      </main>
    ) 
}

const mapStateToProps = (state: State) => ({
  user: state.user
})
const mapDispatchToProps = (_dispatch: Dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(connectedHome)