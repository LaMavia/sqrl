import {
	createStore,
	combineReducers,
	Store,
	Action,
	applyMiddleware,
	compose
} from "redux"
import thunk from "redux-thunk"
import { postsReducer, InitialPostsState, PostsState } from "./reducers/post.reducer"
import { userReducer, InitialUserState, UserState } from "./reducers/user.reducer"
import { navReducer, InitialNavState, NavState } from "./reducers/nav.reducer"
import { authorsReducer, InitialAuthorsState, AuthorsState } from "./reducers/authors.reducer"
import { commentsReducer, InitialCommentsState, CommentsState } from "./reducers/comments.reducer"
import { postCacheReducer, InitialPostCacheState, PostCacheState } from "./reducers/postCache.reducer"

export interface State {
	posts: PostsState
	user: UserState
	nav: NavState,
	authors: AuthorsState,
	comments: CommentsState,
	postCache: PostCacheState
}

export type MyStore = Store<State, Action<any>>

let middleware = [applyMiddleware(thunk)]
// @ts-ignore
if(window.__REDUX_DEVTOOLS_EXTENSION__) middleware.push(window.__REDUX_DEVTOOLS_EXTENSION__())

export const store: MyStore = createStore(
	combineReducers({
		posts: postsReducer,
		user: userReducer,
		nav: navReducer,
		authors: authorsReducer,
		comments: commentsReducer,
		postCache: postCacheReducer
	}),
	{
		posts: InitialPostsState,
		user: InitialUserState,
		nav: InitialNavState,
		authors: InitialAuthorsState,
		comments: InitialCommentsState,
		postCache: InitialPostCacheState
	},
	compose(
    ...middleware
	)
)
