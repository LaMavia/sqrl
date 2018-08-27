import React from 'react'
import { connect } from 'react-redux'
import { Post } from '../dtos/post.dto'
import { Comment } from '../dtos/comment.dto'
import { User } from '../dtos/user.dto'
import PostBtns from './PostBtns'
import UserAndDate from './UserAndDate'
import { mstp } from '../mappers/post.mapper'
import { Dispatch } from 'redux'
import { openModal } from '../actions/modal.actions'

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
	openAddComment: () => any
}

const TxtPost = ({ post, comments, author, openAddComment }: P) => {
	const d = new Date(post.Date)
	return (
		<article className="post post--txt">
			<div className="post__left">
				<header className="post__header">
					<UserAndDate
						className="post__header__author"
						user={author}
						date={d}
					/>
					<div className="post__header__stats">
						<PostBtns
							post={post}
							onLikesClicked={() => {}}
							onCommentsClicked={() => {}}
						/>
					</div>
				</header>
				<main className="post__body">{post.Content}</main>
			</div>
			<div className="post__aside">
				<ul className="post__aside__comments">
					{comments.map((c, i) => (
						<CommentsItem
							date={c.Date}
							author={c.Author}
							content={c.Content}
							key={i}
						/>
					))}
				</ul>
				<button onClick={openAddComment} className="post__aside__add">
					Add comment
				</button>
			</div>
		</article>
	)
}

const mdtp = (dispatch: Dispatch) => ({
	openAddComment: () => openModal('AddComment')(dispatch),
})

// @ts-ignore
export default connect(
	mstp,
	mdtp
)(TxtPost)
