import React from "react"
import { getPosts } from "../actions/post.actions"
import { getAuthors, authorsLoaded } from "../actions/authors.actions"
import { State } from "../store"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { PostsState } from "../reducers/post.reducer"
import { User } from "../dtos/user.dto"
import PostBtns from "./PostBtns";
import UserAndDate from "./UserAndDate";

interface P {
	authors: User[]
	posts: PostsState
	getPosts: (apiURL: string, conditions: string) => any
	getAuthors: (apiURL: string, conditions: string) => any
	setAuthors: (authors: User[]) => any
}

class connectedTxtPosts extends React.PureComponent<P, {}> {
	constructor(props: P) {
		super(props)
	}

	componentDidMount() {
		this.props.authors.forEach(({ _id }) => 
			_id&&this.props.getPosts(`${location.origin}/graphql`, `Author: "${_id}"`),
			this
		)
	}

	render() {
		return (
			<section className="posts__txt">
				<input className="posts__txt__switch" type="radio" name="switch" id="switch_txt"/>
				<ul className="posts__txt__list">
				{this.props.posts.list.map((post, i) => {
					const author: User | undefined = post.Author
					const d = new Date(post.Date)
					return author&&(
						<li className="posts__txt__list__item" key={i}>
							<UserAndDate user={ author as User } date={ d } />
							<p className="posts__txt__list__item__body">
								{ post.Content }
							</p>
							<PostBtns post={post} 
								onLikesClicked={() => { }} 
								onCommentsClicked={() => { }} 
							/>
						</li>
					)
				})}
			</ul>
			</section>
		)
	}
}

const mstp = (state: State) => ({
	// @ts-ignore
	authors: (state.user.me as User).Followers,
	posts: {
		...state.posts,
		list: state.posts.list
			.filter(post => !post.Image)
			// @ts-ignore
			.sort((a, b) => new Date(a.Date) - new Date(b.Date))
	}
})

const mdtp = (dispatch: Dispatch) => ({
	getPosts: (apiURL: string, conditions: string) =>
		getPosts(apiURL, conditions)(dispatch),

	getAuthors: (apiURL: string, conditions: string) =>
		getAuthors(apiURL, conditions)(dispatch),
	
	setAuthors: (authors: User[]) => dispatch(authorsLoaded(authors))
})

// @ts-ignore
export default connect(mstp, mdtp)(connectedTxtPosts)
