import {} from "redux"
import {
	PostAction,
	PostsAction,
	ADD_POST,
	GET_POST,
	DEL_POST,
	GET_POSTS
} from "../actions/postActions"

import { Post } from "../dtos/post.dto"

export async function postReducer(state: Post[], action: PostAction) {
	switch (action.type) {
		case GET_POST:
      return [
        ...state,
        await fetch(`${location.origin}`)
      ]

		default:
			return state
	}
}
