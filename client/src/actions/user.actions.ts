import { User } from "../dtos/user.dto"
import { Dispatch } from "redux"
import { sendQuery } from "../functions/sendQuery"

export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGGED = "USER_LOGGED"
export const USER_LOADING	= "USER_LOADING"
export const USER_ERRORED = "USER_ERRORED"
export const USER_LOADED = "USER_LOADED"
export const USER_UNLOADED = "USER_UNLOADED"
export const USER_PROFILED_LOADED = "USER_PROFILED_LOADED"

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

export const userErrored = (error: Error | null) => ({
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

export const userProfiledLoaded = (user: User) => ({
	type: USER_PROFILED_LOADED,
	user
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

export const getUserProfile = (Username: string) =>
	[Username].some(x => typeof x === "undefined")
	// @ts-ignore because of "this" binding
	? getUser.bind(this, ...[Username])
	: (dispatch: Dispatch) => {
		debugger

		sendQuery(`
			query {

				User(Username: "${Username}") {
					_id
					Name
					Username
					ProfileImageURL
					BackgroundImageURL
					Email
				}

			}
		`)
			.then(res => res.json())
			.then((r) => {
				if(!(r.data && r.data.User)) throw `Failed fetching user's profile: ${JSON.stringify(r.errors, null, 2)}`

				dispatch(userProfiledLoaded(r.data.User))
			})
			.catch(err => dispatch(userErrored(new Error(err))))

	}

export const loginUser = (apiURL: string, username: string, password: string) =>
[apiURL, username, password].some(x => typeof x === "undefined")
	// @ts-ignore because of "this" binding
	? loginUser.bind(this, ...[apiURL, _id])
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
					Followers {
						_id
						Name
						Username
						ProfileImageURL
					}
				}
			}
		`, {}, apiURL)
			.then(res => res.json())
			.then((res) => {
				const { data } = res
				if(data.Login) { // Found matching user
					dispatch(userLoaded(data.Login))
					return data.Login
				}
				throw new Error(`Username "${username}" doesn't match the password`)
			})
			.then(({_id}) => {
				const d = new Date()
				d.setTime(d.getTime() + 7*24*60*60*1000)
				document.cookie = `UserID=${String(_id)}; expires=${d.toUTCString()}`
			})
			.catch(err => dispatch(userErrored(err)))
			.finally(() => dispatch(userIsLoading(false)))
	}

export const loginWithID = (apiURL: string, _id: string) =>
[apiURL, _id].some(x => typeof x === "undefined")
	// @ts-ignore because of "this" binding
	? loginWithID.bind(this, ...[apiURL, _id])
	: (dispatch: Dispatch) => {
		dispatch(userIsLoading(true))
		// Test user: Name: "test", Username: "TestLogin", Password: "Test123", Email: "Test@mail.com"
		sendQuery(`
			query {
				LoginWithID(_id: "${_id}") {
					_id
					Name
					Username
					Email
					ProfileImageURL
					BackgroundImageURL
					Followers {
						_id
						Name
						Username
						ProfileImageURL
					}
				}
			}
		`, {}, apiURL)
			.then(res => res.json())
			.then((res) => {
				const {data} = res
				if(!data || !data.LoginWithID) {
					throw new Error(`LoginWithID failed: ${JSON.stringify(res)}`)
				}
				
				dispatch(userLoaded(data.LoginWithID))
				return data.LoginWithID
			})
			.then(({_id}) => {
				const d = new Date()
				d.setTime(d.getTime() + 7*24*60*60*1000)
				document.cookie = `UserID=${String(_id)}; expires=${d.toUTCString()}`
			})
			.catch(err => dispatch(userErrored(err)))
			.finally(() => dispatch(userIsLoading(false)))
	}

export const logoutUser = (dispatch: Dispatch) => {
	dispatch(userUnloaded())
}

export const registerUser = (apiURL: string, Username: string, Password: string, Email: string, Name: string) =>
[apiURL, Username, Password, Email, Name].some(x => typeof x === "undefined")
	// @ts-ignore because of "this" binding
	? registerUser.bind(this, ...[apiURL, Username, Password, Email, Name].filter(x => typeof x !== "undefined"))
	: (dispatch: Dispatch) => {
		dispatch(userIsLoading(true))
		// Test user: Name: "test", Username: "TestLogin", Password: "Test123", Email: "Test@mail.com"
		sendQuery(`
			mutation {
				userAdd(
					Name: "${Name}",
					Username: "${Username}",
					Password: "${Password}",
					Email: "${Email}"
				) {
					_id
					Name
					Username
					Email
					ProfileImageURL
					BackgroundImageURL
					Followers {
						_id
						Name
						Username
						ProfileImageURL
					}
				}
			}
		`, {}, apiURL)
			.then(res => res.json())
			.then(({data}) => {
				if(!data.userAdd) { // Returned null - user is taken
					throw new Error("Username / Email already taken")
				}
				if(data.userAdd && typeof data.userAdd === "object") {
					dispatch(userLoaded(data.userAdd))
					return data.userAdd
				}
				return {}
			})
			.then(({_id}) => {
				
				if(_id) {
					const d = new Date()
					d.setTime(d.getTime() + 7*24*60*60*1000)
					document.cookie = `UserID=${String(_id)}; expires=${d.toUTCString()}`
				} else {
					alert(`Check your email ${Email} for the activation link!`)
				}	
			})
			.catch(err => dispatch(userErrored(err)))
			.finally(() => dispatch(userIsLoading(false)))
	}

export const setError = 
	(error: Error | null) => 
	(dispatch: Dispatch) => 
	dispatch(userErrored(error))