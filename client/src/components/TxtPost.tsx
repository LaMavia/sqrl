import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Post } from '../dtos/post.dto'
import { Comment } from '../dtos/comment.dto'
import { User } from '../dtos/user.dto'
import PostBtns from './PostBtns'
import UserAndDate from './UserAndDate'
import { mstp } from '../mappers/post.mapper'

interface ItemP {
	date: string
	author: User
	content: string
}

const CommentsItem = ({ date, author, content }: ItemP) => (
	<li className="post__aside__comments__item">
		<UserAndDate
			date={new Date(String(date))}
			user={author}
			className="post__aside__comments__item__author"
		/>
		<p className="post__aside__comments__item__body">{content}</p>
	</li>
)

interface P {
	post: Post
	comments: Comment[]
	author: User
}

class TxtPost extends PureComponent<P> {
	constructor(props: P) {
		super(props)
	}
	/**
	 * @todo Add Loader
	 */
	render() {
		const d = new Date(this.props.post.Date)
		return (
			<article className="post post--txt">
				<div className="post__left">
					<header className="post__header">
						<UserAndDate
							className="post__header__author"
							user={this.props.author}
							date={d}
						/>
						<div className="post__header__stats">
							<PostBtns
								post={this.props.post}
								onLikesClicked={() => {}}
								onCommentsClicked={() => {}}
							/>
						</div>
					</header>
					<main className="post__body">{this.props.post.Content}</main>
				</div>
				<div className="post__aside">
					<ul className="post__aside__comments">
						{this.props.comments.map((c, i) => (
							<CommentsItem
								date={c.Date}
								author={c.Author}
								content={c.Content}
								key={i}
							/>
						))}
					</ul>
					<button className="post__aside__add">Add comment</button>
				</div>
			</article>
		)
	}
}

// @ts-ignore
export default connect(mstp)(TxtPost)
