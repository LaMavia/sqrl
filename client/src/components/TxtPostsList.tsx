import React from "react"
import { connect } from "react-redux"
import { User } from "../dtos/user.dto"
import PostBtns from "./PostBtns";
import UserAndDate from "./UserAndDate";
import { mdtp, makeMSTP } from "../mappers/postList.mapper";
import { P } from "../interfaces/postsList";


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
				<label htmlFor="switch_txt" className="posts__txt__label">Posts</label>
				<ul className="posts__txt__list">
				{this.props.posts.list.map((post, i, arr) => {
					const author: User | undefined = post.Author
					const d = new Date(post.Date)
					return author&&(
						<li className="posts__txt__list__item" key={i} onClick={ this.props.openPost.bind(this, String(post._id), arr) }>
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

const mstp = makeMSTP(false)

// @ts-ignore
export default connect(mstp, mdtp)(connectedTxtPosts)
