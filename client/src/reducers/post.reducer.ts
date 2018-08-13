import { combineReducers, Action } from "redux"
import {
	POSTS_ARE_LOADING,
	POSTS_ERRORED,
	POSTS_LOADED,
	POST_OPEN,
	POST_LOADED
} from "../actions/post.actions"
import { Post } from "../dtos/post.dto";

export interface PostsState {
	error: Error | null
	loading: boolean
	list: Post[]
	currentPost: Post | null,
	open: boolean
}

export const InitialPostsState: PostsState = {
	error: null,
	loading: false,
	list: [],
	currentPost: null,
	open: false
}

interface ErrorAction extends Action {
	error: Error
}
function errorReducer(error: Error | null = null, action: ErrorAction) {
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
		case POSTS_LOADED: return [
			...posts, ...action.posts.filter(post => 
				!posts.some(statePost => post._id === statePost._id)
			)
		]

		default: return posts
	}
}

interface CurrentPostAction extends Action {
	post: Post
}
function currentPostReducer(lastPost: Post | null = null, action: CurrentPostAction) {
	switch(action.type) {
		// Load comments
		case POST_LOADED: return action.post

		default: return lastPost
	}
}

interface OpenPostAction extends Action {
	open: boolean
}
function openPostReducer(wasOpen: boolean = false, action: OpenPostAction) {
	switch(action.type) {
		case POST_OPEN: return action.open
		default: return wasOpen
	}
}

export const postsReducer = combineReducers<PostsState>({
	error: errorReducer,
	loading: loadingReducer,
	list: _postsReducer,
	currentPost: currentPostReducer,
	open: openPostReducer
})