import React from 'react'
import ReactSVG from 'react-svg'
import { Post } from '../dtos/post.dto'

interface P {
	post: Post
	onLikesClicked: (e: any) => any
	onCommentsClicked: (e: any) => any
}

export default ({ post, onLikesClicked, onCommentsClicked }: P) => (
	<div className="btns">
		<button onClick={onLikesClicked} className="btns__btn btns__btn--likes">
			<ReactSVG path="/svg/thumb_up.svg" className="btns__btn__icon" />
			<p className="btns__btn__counter">{post.Likes}</p>
		</button>
		<button
			onClick={onCommentsClicked}
			className="btns__btn btns__btn--comments"
		>
			<ReactSVG path="/svg/comment.svg" className="btns__btn__icon" />
			<p className="btns__btn__counter">0</p>
		</button>
	</div>
)
