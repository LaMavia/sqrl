import React, { FormEvent, FormEventHandler } from "react"
import { NavLink, Redirect } from "react-router-dom"
import { State } from "../store";
import { Dispatch } from "redux";
import { connect } from "react-redux"
import { loginUser } from "../actions/user.actions"
import { UserState } from "../reducers/user.reducer";


interface Props {
  user: UserState
  login: (username: string, password: string) => any
}
const connectedLogin = ({ user, login }: Props) => {

  const handleLogin: FormEventHandler = (e: FormEvent) => {
    debugger
    e.preventDefault()
    const username = (e.currentTarget.querySelector("#login") as any).value
    const password = (e.currentTarget.querySelector("#password") as any).value

    if(!username || !password) {
      alert("Login Error")
      throw new Error("Login/Password is undefined")
    }

    login(username, password)
  }

  if(user.loggedIn) return <Redirect to="/" exact/>
	return (
		<main className="sign">
			<h1 className="sign__title" />
			<form action="" className="sign__form" onSubmit={ handleLogin }>
				<div className="sign__form__part">
					<label htmlFor="login" className="sign__form__part__label" />
					<input
						type="text"
						name="login"
						id="login"
						className="sign__form__part__input"
					/>
				</div>
				<div className="sign__form__part">
					<label htmlFor="password" className="sign__form__part__label" />
					<input
						type="password"
						name="password"
						id="password"
						className="sign__form__part__input"
					/>
				</div>

        <input className="sign__form__submit" type="submit" value="Login"/>

			</form>
      <p className="sign__txt">
        Don't have an account? <NavLink to="/register" className="sign__txt__link">Register</NavLink>
      </p>
		</main>
	)
}

const mState = (state: State) => ({
  user: state.user
})

const mDispatch = (dispatch: Dispatch) => ({
  login: (username: string, password: string) => (username&&password)&&loginUser(`${location.origin}/graphql`, username, password)(dispatch)
})

export default connect(mState, mDispatch)(connectedLogin)