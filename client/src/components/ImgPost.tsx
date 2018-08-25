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

const ImgPost = ({ post, comments, author, openAddComment }: P) => {
	const d = new Date(post.Date)
	return (
		<article className="post">
			<img className="post__img" src={post.Image} alt="" />
			<div className="post__aside">
				<header className="post__aside__header">
					<UserAndDate
						className="post__aside__header__author"
						user={author}
						date={d}
					/>
					<main className="post__aside__header__body">{post.Content}</main>
					<div className="post__aside__header__stats">
						<PostBtns
							post={post}
							onLikesClicked={() => {}}
							onCommentsClicked={() => {}}
						/>
					</div>
				</header>
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
				<button className="post__aside__add" onClick={openAddComment}>
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
)(ImgPost)
