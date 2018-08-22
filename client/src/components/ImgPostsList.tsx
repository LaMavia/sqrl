import React from "react"
import { connect } from "react-redux"
import { User } from "../dtos/user.dto"
import PostBtns from "./PostBtns";
import UserAndDate from "./UserAndDate";
import { mdtp, makeMSTP } from "../mappers/postList.mapper";
import { P } from "../interfaces/postsList";

class connectedImgPosts extends React.PureComponent<P, {}> {
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
			<section className="posts__img">
				<input className="posts__img__switch" type="radio" name="switch" id="switch_img" defaultChecked/>
				<ul className="posts__img__list">
				
					{this.props.posts.list.map((post, i, arr) => {
						const author: User | undefined = post.Author
						const d = new Date(post.Date)
						return author&&(
							<li className="posts__img__list__item" key={i} onClick={this.props.openPost.bind(this, String(post._id), arr)}>
								<UserAndDate user={author as User} date={d} />
								<div className="posts__img__list__item__body">
									<img className="posts__img__list__item__body__img" src={post.Image} alt="" />
									<p className="posts__img__list__item__body__content">
										{post.Content}
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

const mstp = makeMSTP(true)
// @ts-ignore
export default connect(mstp, mdtp)(connectedImgPosts)
