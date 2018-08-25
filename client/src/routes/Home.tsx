import React from "react"
import { State } from "../store"
import { UserState } from "../reducers/user.reducer"
import { Redirect } from "react-router-dom"
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Posts } from "../components/PostsSection";
import { Modal } from "../reducers/modal.reducer";


interface Props {
  user: UserState
  modals: Modal[]
}
const connectedHome = ({user, modals}: Props) => {
  if(!user.me) return <Redirect to="/login"/> 

  return (
      <main className="home">
        <Posts />
        {
          (() => modals.filter(m => m.open&&m.component).map((modal, i) => (
            <modal.component key={i}/>
          )))()
        }
      </main>
    ) 
}

const mapStateToProps = (state: State) => ({
  user: state.user,
  modals: state.modal
})
const mapDispatchToProps = (_dispatch: Dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(connectedHome)