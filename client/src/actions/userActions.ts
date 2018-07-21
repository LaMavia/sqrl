import { ActionCreator, Action } from "redux"
import { LooseObject } from "../types"


export const GET_USER = "user:GET_USER"
export const ADD_USER = "user:ADD_USER"
export const DEL_USER = "user:DEL_USER"


export interface UserAction extends Action {
	query: LooseObject
}


export const getUser: ActionCreator<UserAction> = (
	query: LooseObject
) => ({
	type: GET_USER,
	query
})

export const addUser: ActionCreator<UserAction> = (
	query: LooseObject
) => ({
	type: ADD_USER,
	query
})

export const delUser: ActionCreator<UserAction> = (
  query: LooseObject
) => ({
  type: DEL_USER,
  query
})