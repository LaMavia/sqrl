import {} from "redux"
import {
	PostAction,
	PostsAction,
	ADD_POST,
	GET_POST,
	DEL_POST,
	GET_POSTS
} from "../actions/postActions"


export function postReducer(state: LooseObject = {}, action: PostAction) {
	switch (action.type) {
		case GET_POST:
			return Object.assign({}, state, {})

		default:
			return state
	}
}
