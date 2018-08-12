import React, { FormEvent, FormEventHandler } from "react"
import { Redirect, Link } from "react-router-dom"
import { State } from "../store"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { loginUser, setError } from "../actions/user.actions"
import { UserState } from "../reducers/user.reducer"
import FormError from "../components/FormError";

interface Props {
	user: UserState
	login: (username: string, password: string) => any
	setError: (error: Error | null) => any
}
const connectedLogin = ({ user, login, setError }: Props) => {
	const handleLogin: FormEventHandler = (e: FormEvent) => {
		e.preventDefault()
		const username = (e.currentTarget.querySelector("#login") as any).value
		const password = (e.currentTarget.querySelector("#password") as any).value

		if (!username || !password) {
			setError(new Error("No username / password"))
			// throw new Error("Login/Password is undefined")
		}

		login(username, password)
	}

	const clearError = () => {
		setError(null)
	}
	
	if (user.me) return <Redirect to="/" exact />
	return (
		<div className="bg">
			<main className="sign">
				<FormError/>
				<h1 className="sign__title">Login</h1>
				<form action="" className="sign__form" onSubmit={handleLogin}>
					<div className="sign__form__part">
						<label htmlFor="login" className="sign__form__part__label">
							Login
						</label>
						<input
							type="text"
							name="login"
							id="login"
							className="sign__form__part__input"
						/>
					</div>
					<div className="sign__form__part">
						<label htmlFor="password" className="sign__form__part__label">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="sign__form__part__input"
						/>
					</div>

					<input className="sign__form__submit" type="submit" value="Login" />
				</form>
				<p className="sign__txt">
					Don't have an account?{" "}
					<Link onClick={clearError} to="/register" className="sign__txt__link">
						{" "}
						Register!
					</Link>
				</p>
			</main>
		</div>
	)
}

const mState = (state: State) => ({
	user: state.user
})

const mDispatch = (dispatch: Dispatch) => ({
	login: (username: string, password: string) =>
		username &&
		password &&
		loginUser(`${location.origin}/graphql`, username, password)(dispatch),
	setError: (error: Error | null) => 
		setError(error)(dispatch)
})

export default connect(
	mState,
	mDispatch
)(connectedLogin)
