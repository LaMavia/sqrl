import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { State } from '../store';
import { Post } from '../dtos/post.dto';
import { Comment } from '../dtos/comment.dto';
import { User } from '../dtos/user.dto';
import PostBtns from './PostBtns';
import UserAndDate from './UserAndDate';

interface ItemP {
  date: String
  author: User
  content: String
}

const CommentsItem = ({ date, author, content }: ItemP) => (
  <li className="post__aside__comments__item">
    <UserAndDate 
      date={ new Date(String(date)) } 
      user={ author }
      className="post__aside__comments__item__author"
    />
    <p className="post__aside__comments__item__body">
      { content }
    </p>
  </li>
)


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
          <header className="post__aside__header">
            <UserAndDate className="post__aside__header__author" user={this.props.author} date={d} />
            <main className="post__aside__header__body">
              {
                this.props.post.Content
              }
            </main>
            <div className="post__aside__header__stats">
              <PostBtns post={this.props.post}
                onLikesClicked={() => { }}
                onCommentsClicked={() => { }}
              />
            </div>
          </header>
          <ul className="post__aside__comments">
            {
              this.props.comments.map((c, i) => 
                <CommentsItem 
                  date={ c.Date } 
                  author={ c.Author } 
                  content={ c.Content } 
                  key={ i }
                />
              )
            }
          </ul>
          <button className="post__aside__add">Add comment</button>
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
    ? state.comments.list.filter(cm => cm.Post._id === state.posts.currentPost._id)
    : [],
  author: state.posts.currentPost     
    // @ts-ignore
    ? state.posts.currentPost.Author
    : {}
})

// @ts-ignore
export default connect(mstp)(ImgPost)
