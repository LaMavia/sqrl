import React from "react"
import { getPosts, loadPost, postOpen } from "../actions/post.actions"
import { getAuthors } from "../actions/authors.actions"
import { State } from "../store"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { PostsState } from "../reducers/post.reducer"
import { User } from "../dtos/user.dto"
import mongoose from "mongoose"
import PostBtns from "./PostBtns";
import { Post } from "../dtos/post.dto";
import UserAndDate from "./UserAndDate";
import { getComments } from "../actions/comments.actions";

interface P {
	authors: {
		list: User[]
		ids: mongoose.Types.ObjectId[]
	}
	posts: PostsState
	isOpen: boolean
	getPosts: (apiURL: string, conditions: string) => any
	getAuthors: (apiURL: string, conditions: string) => any
	openPost: (_id: string) => any
}

class connectedImgPosts extends React.PureComponent<P, {}> {
	constructor(props: P) {
		super(props)
	}

	componentDidMount() {
		if (this.props.authors.ids && this.props.authors.list.length === 0) {
			this.props.getAuthors(`${location.origin}/graphql`, `Ids: ${JSON.stringify(
        this.props.authors.ids
          .map(String)
          .filter(unfetchedID => this.props.authors.list
            .map(a => String(a._id))
            .some(fetchedID => fetchedID === unfetchedID))
			)}`)

			this.props.authors.ids.forEach(id => {
				this.props.getPosts(`${location.origin}/graphql`, `Author: "${id}"`)
			})
		}
	}

	render() {
		return (
			<section className="posts__img">
				<input className="posts__img__switch" type="radio" name="switch" id="switch_img" defaultChecked/>
				<ul className="posts__img__list">
				
				{this.props.posts.list.map((post, i, arr) => {
					const author: User | undefined = this.props.authors.list.find(
						a => String(a._id) === String(post.Author)
					)
					const d = new Date(post.Date)
					return (
						<li className="posts__img__list__item" key={i} onClick={ this.props.openPost.bind(this, String(post._id), arr) }>
							<UserAndDate user={ author as User } date={ d }/>
							<div className="posts__img__list__item__body">
								<img className="posts__img__list__item__body__img" src={ post.ImageURL } alt=""/>
                <p className="posts__img__list__item__body__content">
                  { post.Content }
                </p>
							</div>
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
			.filter(post => !!post.ImageURL)
			// @ts-ignore
			.sort((a, b) => new Date(a.Date) - new Date(b.Date))
	},
	isOpen: state.posts.open
})

const mdtp = (dispatch: Dispatch) => ({
	getPosts: (apiURL: string, conditions: string) =>
		getPosts(apiURL, conditions)(dispatch),

	getAuthors: (apiURL: string, conditions: string) =>
		getAuthors(apiURL, conditions)(dispatch),

	openPost: (_id: string, posts: Post[]) => {
		loadPost(_id, posts)(dispatch)
		getComments(`Post: "${String(_id)}"`)
		dispatch(postOpen(true))
	}
})

// @ts-ignore
export default connect(mstp, mdtp)(connectedImgPosts)
