import React from "react"
import { UserState } from "../reducers/user.reducer";
import { connect } from "react-redux";
import { State } from "../store";

interface P {
  user: UserState
}

const connectedError = ({ user }: P) => (
  user.error ?
  (
    <div className="sign__error">
      <p className="sign__error__txt">
        {
          user.error.message
        }
      </p>
    </div>
  ) : <div></div>
)

const mstp = (state: State) => ({
  user: state.user
})

export default connect(mstp)(connectedError)
