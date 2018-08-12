import React from 'react'
import ReactSVG from 'react-svg';
import { Post } from '../dtos/post.dto';
import { connect } from '../../../node_modules/@types/react-redux';

interface P {
  post: Post
  addLikes: (amount: number) => any
}

const connectedButtons = ({ post, addLikes }: P) => {
  const clickHandler = () => {
    
  }

  return (
    <div className="posts__img__list__item__bottom">
      <button className="posts__img__list__item__bottom__btn posts__img__list__item__bottom__btn--likes">
        <ReactSVG
          path="/svg/thumb_up.svg"
          className="posts__img__list__item__bottom__btn__icon"
        />
        <p className="posts__img__list__item__bottom__btn__counter">
          {post.Likes}
        </p>
      </button>
      <button className="posts__img__list__item__bottom__btn posts__img__list__item__bottom__btn--comments">
        <ReactSVG
          path="/svg/comment.svg"
          className="posts__img__list__item__bottom__btn__icon"
        />
        <p className="posts__img__list__item__bottom__btn__counter">0</p>
      </button>
    </div>
  )
}

export default connect()(connectedButtons)
