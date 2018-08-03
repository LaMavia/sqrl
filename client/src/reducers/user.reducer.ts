import { combineReducers, Action } from "redux"
import {
  USER_LOGGED,
  USER_ERRORED,
  USER_LOADED,
  USER_UNLOADED
} from "../actions/user.actions"
import { User } from "../dtos/user.dto"

export interface UserState {
  loggedIn: boolean
  me: null | User
  error: null | Error
}

export const InitialUserState: UserState = {
  loggedIn: false,
  me: null,
  error: null,
}

interface ErrorAction extends Action {
	error: Error
}
function errorReducer(error = null, action: ErrorAction) {
  switch(action.type) {
    case USER_ERRORED: return action.error
    default: return error
  }
}

interface LoggedInAction extends Action {
  isLoggedIn: boolean
}
function loggedInReducer(isLoggedIn: boolean = false, action: LoggedInAction) {
  switch(action.type) {
    case USER_LOGGED: return action.isLoggedIn
    default: return isLoggedIn
  }
}

interface UserAction extends Action {
  user: User | null
}
function _userReducer(user: User | null = null, action: UserAction) {
  switch(action.type) {
    case USER_LOADED: return action.user
    case USER_UNLOADED: return null
    default: return user
  }
}

// @ts-ignore
export const userReducer = combineReducers<UserState>({
  error: errorReducer,
  loggedIn: loggedInReducer,
  me: _userReducer
})
