import { ActionCreator, Action } from "redux"
import { LooseObject } from "../types"

export const GET_POST = "post:GET_POST"
export const ADD_POST = "post:ADD_POST"
export const DEL_POST = "post:DEL_POST"

export const GET_POSTS = "post:GET_POSTS"

export interface PostAction extends Action {
  query: LooseObject
}

export interface PostsAction extends PostAction {
  limit: number
}

export const getPost: ActionCreator<PostAction> = (query: LooseObject) => ({
  type: GET_POST,
  query
})

export const addPost: ActionCreator<PostAction> = (query: LooseObject) => ({
  type: ADD_POST,
  query
})

export const delPost: ActionCreator<PostAction> = (query: LooseObject) => ({
  type: DEL_POST,
  query
})

export const getPosts: ActionCreator<PostsAction> = (query: LooseObject, limit: number) => ({
  type: GET_POSTS,
  query,
  limit
})