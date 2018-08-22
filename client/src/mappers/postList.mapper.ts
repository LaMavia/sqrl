import { Dispatch } from 'redux'

import { getPosts, loadPost, postOpen } from '../actions/post.actions'

import { getAuthors } from '../actions/authors.actions'

import { Post } from '../dtos/post.dto'

import { getComments } from '../actions/comments.actions'
import { State } from '../store';

export const mdtp = (dispatch: Dispatch) => ({
	getPosts: (apiURL: string, conditions: string) =>
		getPosts(apiURL, conditions)(dispatch),

	getAuthors: (apiURL: string, conditions: string) =>
		getAuthors(apiURL, conditions)(dispatch),

	openPost: (_id: string, posts: Post[]) => {
		loadPost(_id, posts)(dispatch)
		getComments(`Post: "${_id}"`)(dispatch)
		dispatch(postOpen(true))
	},
})

export const makeMSTP = (withImages: boolean) => (state: State) => ({
	// @ts-ignore
	authors: [...state.user.me.Followers, state.user.me],
	posts: {
		...state.posts,
		list: state.posts.list
			.filter(post => withImages ? !!post.Image : !post.Image)
			// @ts-ignore
			.sort((a, b) => new Date(a.Date) - new Date(b.Date)),
	},
	isOpen: state.posts.open,
})
