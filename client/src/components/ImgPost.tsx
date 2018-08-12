import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { State } from '../store';
import { Post } from '../dtos/post.dto';
import { Comment } from '../dtos/comment.dto';
import { User } from '../dtos/user.dto';
import PostBtns from './PostBtns';

interface P {
  post: Post
  comments: Comment[]
  author: User
}

class ImgPost extends PureComponent<P> {
  constructor(props: P) {
    super(props)
  }
  /**
   * @todo Add Loader
   */
  render() {
    const d = new Date(this.props.post.Date)
    return (
      <article className="post">
        <img className="post__img" src={this.props.post.ImageURL} alt=""/>
        <header className="post__header">
          <img src={ this.props.author.ProfileImageURL } alt="" className="post__header__img"/>
          <p className="post__header__author">
            { this.props.author.Name }
          </p>
          <p className="post__header__date">
            {
              `${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}.${d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth()}.${d.getFullYear()}`
            }
          </p>
        </header>
        <main className="post__body">
          {
            this.props.post.Content
          }
        </main>
        <div className="post__stats">
          <PostBtns post={this.props.post} 
            onLikesClicked={() => { }} 
            onCommentsClicked={() => { }} 
          />
        </div>
      </article>
    )
  }
}

const mstp = (state: State) => ({
  post: state.posts.currentPost ? state.posts.currentPost : {},
  comments: state.posts.currentPost ? [] : [],
  author: state.posts.currentPost ? 
    // @ts-ignore
    state.authors.find(sa => String(sa._id) === String(state.posts.currentPost.post.Author))
    : {}
})

// @ts-ignore
export default connect(mstp)(ImgPost)
