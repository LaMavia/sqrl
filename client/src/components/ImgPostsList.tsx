import React from "react"
import { User } from "../dtos/user.dto"
import PostBtns from "./PostBtns";
import UserAndDate from "./UserAndDate";
import { mdtp, makeMSTP } from "../mappers/postList.mapper";
import { P } from "../interfaces/postsList";
import { connect } from "react-redux";

const mstp = makeMSTP(true)

export class connectedImgPosts extends React.PureComponent<P> {
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
				<label htmlFor="switch_img" className="posts__img__label">Images</label>
				<ul className="posts__img__list">
				
					{this.props.posts.list
						.filter(this.props.filter||(() => true))
						.map((post, i, arr) => {
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

export default connect(mstp, mdtp)(connectedImgPosts)