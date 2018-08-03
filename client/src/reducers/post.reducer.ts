import { combineReducers, Action } from "redux"
import {
	POSTS_ARE_LOADING,
	POSTS_ERRORED,
	POSTS_LOADED
} from "../actions/post.actions"
import { Post } from "../dtos/post.dto";

export interface PostsState {
	error: Error | null
	loading: boolean
	list: Post[]
}

export const InitialPostsState: PostsState = {
	error: null,
	loading: false,
	list: []
}

interface ErrorAction extends Action {
	error: Error
}
function errorReducer(error = null, action: ErrorAction) {
	switch(action.type) {
		case POSTS_ERRORED: return action.error
		default: return error
	}
}

interface LoadingAction extends Action {
	areLoading: boolean
}
function loadingReducer(areLoading: boolean = false, action: LoadingAction) {
	switch(action.type) {
		case POSTS_ARE_LOADING: return action.areLoading
		default: return areLoading
	}
}

interface PostsAction extends Action {
	posts: Post[]
}
function _postsReducer(posts: Post[] = [], action: PostsAction) {
	switch (action.type) {
		case POSTS_LOADED: return [...posts, ...action.posts]
		default: return posts
	}
}

// @ts-ignore
export const postsReducer = combineReducers<PostsState>({
	error: errorReducer,
	loading: loadingReducer,
	list: _postsReducer
})