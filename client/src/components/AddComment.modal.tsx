import React, { PureComponent, FormEvent } from 'react'
import { User } from '../dtos/user.dto';
import Modal from './Modal';
import { State } from '../store';
import { Dispatch } from 'redux';
import ReactSVG from 'react-svg';
import { Post } from '../dtos/post.dto';
import { closeModal } from '../actions/modal.actions';
import { addComment } from '../actions/comments.actions';
import { connectComponent } from '../decorators/redux';

const mstp = (state: State) => ({
  user: state.user.me,
  post: state.posts.currentPost
})

const mdtp = (dispatch: Dispatch) => ({
  addComment: (Content: string, Author: string, Post: string) => addComment(Content, Author, Post)(dispatch),
  hide: () => closeModal("AddComment")(dispatch)
})

interface P {
  user: User
  post: Post
  hide: (args: any) => any
  addComment: (Content: string, Author: string, Post: string) => any
} 

@connectComponent(mstp, mdtp)
export default class ConnectedAdd extends PureComponent<P> {

  constructor(props: any) {
    super(props)
    this.addPost = this.addPost.bind(this)
  }

  addPost(e: FormEvent) {
    e.preventDefault()
    debugger

    // @ts-ignore
    const Content = e.target.content.value
    const Author = String(this.props.user._id)
    const Post = String(this.props.post._id)
    this.props.addComment(Content, Author, Post)
  }

  render() {
    return (
      <Modal onClick={ this.props.hide }>
        <form ref="form" id="add-form" action="" className="add" onSubmit={ this.addPost.bind(this) }>
          <div className="add__top">
            <img src={ this.props.user 
              ? this.props.user.ProfileImageURL
              : ""
            } alt="" className="add__top__img"/>
            <button className="add__top__exit" onClick={ this.props.hide||(() => {}) }>
              <ReactSVG path="/svg/clear.svg"></ReactSVG>
            </button>
          </div>

          <div className="add__body">
            <textarea placeholder={`Say something about ${this.props.post.Author.Name}'s post`} className="add__body__txt" name="content"/>
          </div>

          <div className="add__bottom">
            <button type="submit" className="add__bottom__btn add__bottom__btn--submit" form="add-form">
              <ReactSVG path="/svg/publish.svg" />
              <p className="add__bottom__btn__txt">Publish</p>
            </button>
          </div>
        </form>
      </Modal>
    )
  }
}