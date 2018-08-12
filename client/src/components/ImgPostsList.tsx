import React from "react"
import { getPosts } from "../actions/post.actions"
import { getAuthors } from "../actions/authors.actions"
import { State } from "../store"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { PostsState } from "../reducers/post.reducer"
import { User } from "../dtos/user.dto"
import mongoose from "mongoose"
import ReactSVG from "react-svg";
import PostBtns from "./PostBtns";

interface P {
	authors: {
		list: User[]
		ids: mongoose.Types.ObjectId[]
	}
	posts: PostsState
	getPosts: (apiURL: string, conditions: string) => any
	getAuthors: (apiURL: string, conditions: string) => any
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
				{this.props.posts.list.map((post, i) => {
					const author: User | undefined = this.props.authors.list.find(
						a => String(a._id) === String(post.Author)
					)
					const d = new Date(post.Date)
					return (
						<li className="posts__img__list__item" key={i}>
							<div className="posts__img__list__item__top">
								<img
									src={author && author.ProfileImageURL}
									alt=""
									className="posts__img__list__item__top__img"
								/>
								<p className="posts__img__list__item__top__author">
									{ author && author.Name }
								</p>
								<p className="posts__img__list__item__top__date">
									{post && `${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}.${d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth()}.${d.getFullYear()}`}
								</p>
							</div>
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
	}
})

const mdtp = (dispatch: Dispatch) => ({
	getPosts: (apiURL: string, conditions: string) =>
		getPosts(apiURL, conditions)(dispatch),

	getAuthors: (apiURL: string, conditions: string) =>
		getAuthors(apiURL, conditions)(dispatch)
})

// @ts-ignore
export default connect(mstp, mdtp)(connectedImgPosts)
