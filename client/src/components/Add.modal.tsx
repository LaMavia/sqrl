import React, { PureComponent, FormEvent, ChangeEvent } from 'react'
import { User } from '../dtos/user.dto';
import Modal from './Modal';
import { connect } from 'react-redux';
import { State } from '../store';
import { Dispatch } from 'redux';
import { closeNavModal } from '../actions/nav.action';
import ReactSVG from 'react-svg';
import { PostCacheInput, cacheUpdate, cacheFlush } from '../actions/postCache.actions';
import { addPost } from "../actions/post.actions"
import { PostCacheState } from '../reducers/postCache.reducer';

interface P {
  user: User
  post: PostCacheState
  hide: (args: any) => any
  updateCache: (input: {[key: string]: string}) => any
  flushCache: (args?: any) => any
  addPost: (Content: string, ImageURL: string, Author: string) => any
} 

class ConnectedAdd extends PureComponent<P> {

  addPost(e: FormEvent) {
    e.preventDefault()
    debugger

    const res = this.props.addPost(
      this.props.post.Content,
      this.props.post.ImageURL,
      String(this.props.user._id)
    )
    if(res) {
      this.props.flushCache()
    }
  }

  updateCache(field: string, e: ChangeEvent) {
    // @ts-ignore
    this.props.updateCache({[field]: e.target.value})
  }

  handleFile(e: Event) {
    // @ts-ignore
    if(e.target.files[0]) {
      const reader = new FileReader()
      // @ts-ignore
      reader.readAsDataURL((e.target as EventTarget).files[0])
      reader.onload = () => {
        this.props.updateCache({ImageURL: reader.result as string | ""})
      }
  
      reader.onerror = err => {
        alert(err)
      }
    }
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
            <textarea value={ this.props.post.Content } placeholder={`How are you doing ${this.props.user&&this.props.user.Name}?`} className="add__body__txt" onChange={ this.updateCache.bind(this, "Content") }/>
            {
              (() => this.props.post.ImageURL&& 
                <img className="add__body__img" alt="" src={this.props.post.ImageURL}/>
              )()
            }
          </div>

          <div className="add__bottom">
            <input accept="image/*" type="file" name="img" id="input-img" style={{display: "none"}} onChange={ this.handleFile.bind(this) }/>
            <label htmlFor="input-img" className="add__bottom__btn">
              <ReactSVG path="/svg/photo.svg" />
              <p className="add__bottom__btn__txt">Add an image</p>
            </label>
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

const mstp = (state: State) => ({
  user: state.user.me,
  post: state.postCache
})

const mdtp = (dispatch: Dispatch) => ({
  hide: () => closeNavModal("add")(dispatch),
  updateCache: (input: PostCacheInput) => dispatch(cacheUpdate(input)),
  flushCache: () => dispatch(cacheFlush()),
  addPost: (Content: string, ImageURL: string, Author: string) => addPost({Content, ImageURL}, Author)(dispatch)
})

// @ts-ignore
export default connect(mstp, mdtp)(ConnectedAdd)
