import React from "react"
import { getPosts } from "../actions/post.actions"
import { getAuthors } from "../actions/authors.actions"
import { State } from "../store"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { PostsState } from "../reducers/post.reducer"
import { User } from "../dtos/user.dto"
import mongoose from "mongoose"
import PostBtns from "./PostBtns";
import UserAndDate from "./UserAndDate";

interface P {
	authors: {
		list: User[]
		ids: mongoose.Types.ObjectId[]
	}
	posts: PostsState
	getPosts: (apiURL: string, conditions: string) => any
	getAuthors: (apiURL: string, conditions: string) => any
}

class connectedTxtPosts extends React.PureComponent<P, {}> {
	constructor(props: P) {
		super(props)
	}

	componentDidMount() {
		if (this.props.authors.ids && this.props.authors.list.length === 0) {
			this.props.getAuthors(`${location.origin}/graphql`, `Ids: ${JSON.stringify(
				this.props.authors.ids.map(String)
			)}`)

			this.props.authors.ids.forEach(id => {
				this.props.getPosts(`${location.origin}/graphql`, `Author: "${id}"`)
			})
		}
	}

	render() {
		return (
			<section className="posts__txt">
				<input className="posts__txt__switch" type="radio" name="switch" id="switch_txt"/>
				<ul className="posts__txt__list">
				{this.props.posts.list.map((post, i) => {
					const author: User | undefined = this.props.authors.list.find(
						a => String(a._id) === String(post.Author)
					)
					const d = new Date(post.Date)
					return (
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
	authors: {
		list: state.authors,
		ids: (state.user.me as User).Followers
	},
	posts: {
		...state.posts,
		list: state.posts.list
			.filter(post => !post.ImageURL)
			// @ts-ignore
			.sort((a, b) => new Date(a.Date) - new Date(b.Date))
	}
})

const mdtp = (dispatch: Dispatch) => ({
	getPosts: (apiURL: string, conditions: string) =>
		getPosts(apiURL, conditions)(dispatch),

	getAuthors: (apiURL: string, conditions: string) =>
		getAuthors(apiURL, conditions)(dispatch)
})

// @ts-ignore
export default connect(mstp, mdtp)(connectedTxtPosts)
