import { User } from "../dtos/user.dto"
import { Dispatch } from "redux"
import { sendQuery } from "../functions/sendQuery"

export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGGED = "USER_LOGGED"
export const USER_LOADING	= "USER_LOADING"
export const USER_ERRORED = "USER_ERRORED"
export const USER_LOADED = "USER_LOADED"
export const USER_UNLOADED = "USER_UNLOADED"

export const userLogin = (username: string, password: string) => ({
	type: USER_LOGIN,
	data: {
		username,
		password
	}
})

export const userIsLoading = (yayOrNay: boolean) => ({
	type: USER_LOADING,
	isLoading: yayOrNay
})

export const userErrored = (error: Error) => ({
	type: USER_ERRORED,
	error
})

export const userLoaded = (user: User) => ({
	type: USER_LOADED,
	user
})

export const userUnloaded = () => ({
	type: USER_UNLOADED
})

export const userLogged = (isLoggedIn: boolean) => ({
	type: USER_LOGGED,
	isLoggedIn
})

// Functions ----------------------------------------------------------------

export const getUser = (apiURL: string, conditions: string) =>
	[apiURL, conditions].some(x => typeof x === "undefined")
		// @ts-ignore because of "this" binding
		? getUser.bind(this, ...[apiURL, conditions, limit, skip])
		: (dispatch: Dispatch) => {

			dispatch(userIsLoading(true))
			sendQuery(`
				{

					User(${conditions}) {
						_id
						Name
						Username
						Email
					}

				}
			`, {}, apiURL)
				.then(res => res.json())
				.then(({data}) => dispatch(userLoaded(data.User)))
				.catch(err => dispatch(userErrored(new Error(err))))
				.finally(() => dispatch(userIsLoading(false)))

		}

export const loginUser = (apiURL: string, username: string, password: string) =>
[apiURL, username, password].some(x => typeof x === "undefined")
	// @ts-ignore because of "this" binding
	? getUser.bind(this, ...[apiURL, conditions, limit, skip])
	: (dispatch: Dispatch) => {
		dispatch(userIsLoading(true))
		// Test user: Name: "test", Username: "TestLogin", Password: "Test123", Email: "Test@mail.com"
		sendQuery(`
			{
				Login(Username: "${username}", Password: "${password}") {
					_id
					Name
					Username
					Email
					ProfileImageURL
					BackgroundImageURL
					Followers
				}
			}
		`, {}, apiURL)
			.then(res => res.json())
			.then(({data}) => dispatch(userLoaded(data.Login)))
			.then(() => dispatch(userLogged(true)))
			.catch(err => dispatch(userErrored(new Error(err))))
			.finally(() => dispatch(userIsLoading(false)))
	}

export const logoutUser = (dispatch: Dispatch) => {
	dispatch(userLogged(false))
	dispatch(userUnloaded())
}