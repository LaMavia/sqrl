import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { State } from '../store';
import { Post } from '../dtos/post.dto';
import { Comment } from '../dtos/comment.dto';
import { User } from '../dtos/user.dto';
import PostBtns from './PostBtns';
import { Dispatch } from '../../../node_modules/redux';
import UserAndDate from './UserAndDate';

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
        <div className="post__aside">
          <UserAndDate className="post__aside__author" user={this.props.author} date={d} />
          <main className="post__aside__body">
            {
              this.props.post.Content
            }
          </main>
          <div className="post__aside__stats">
            <PostBtns post={this.props.post}
              onLikesClicked={() => { }}
              onCommentsClicked={() => { }}
            />
          </div>
          <ul className="post__aside__comments">
            {
              this.props.comments.map(c => (
                <li className="post__aside__comments__item">
                 { c.Content }
                </li>
              ))
            }
          </ul>
        </div>
      </article>
    )
  }
}

const mstp = (state: State) => ({
  post: state.posts.currentPost 
    ? state.posts.currentPost 
    : {},
  comments: state.posts.currentPost 
    // @ts-ignore
    ? state.comments.list.filter(cm => String(cm.Post) === String(state.posts.currentPost._id) )
    : [],
  author: state.posts.currentPost     
    // @ts-ignore
    ? state.authors.find(sa => String(sa._id) === String(state.posts.currentPost.Author))
    : {}
})

const mdtp = (dispatch: Dispatch) => ({

})

// @ts-ignore
export default connect(mstp)(ImgPost)
