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

export interface State {
	posts: PostsState
	user: UserState
	nav: NavState
}

export type MyStore = Store<State, Action<any>>

// @ts-ignore
export const store: MyStore = createStore(
	// @ts-ignore
	combineReducers({
		posts: postsReducer,
		user: userReducer,
		nav: navReducer
	}),
	// @ts-ignore
	{
		posts: InitialPostsState,
		user: InitialUserState,
		nav: InitialNavState
	},
	compose(
    applyMiddleware(thunk),
    // @ts-ignore
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)
