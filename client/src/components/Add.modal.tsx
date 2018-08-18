import React, { PureComponent, FormEvent, ChangeEvent } from 'react'
import { User } from '../dtos/user.dto';
import Modal from './Modal';
import { connect } from 'react-redux';
import { State } from '../store';
import { Dispatch } from 'redux';
import { closeNavModal } from '../actions/nav.action';
import ReactSVG from 'react-svg';
import { PostCacheInput, cacheUpdate, cacheFlush } from '../actions/postCache.actions';
import { PostCacheState } from '../reducers/postCache.reducer';

interface P {
  user: User
  post: PostCacheState
  hide: (args: any) => any
  updateCache: (args: any) => any
  flushCache: (args: any) => any
} 

class ConnectedAdd extends PureComponent<P> {

  addPost(e: FormEvent) {
    e.preventDefault()
    debugger
  }

  updateCache(field: string, e: ChangeEvent) {
    e.preventDefault()
    // @ts-ignore
    console.log({[field]: e.target.value})
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
            <textarea placeholder={`How are you doing ${this.props.user&&this.props.user.Name}?`} className="add__body__txt" onChange={ this.updateCache.bind(this, "Content") }/>
            {
              (() => this.props.post.ImageURL&& 
                <img className="add__body__img" alt="" src={this.props.post.ImageURL}/>
              )()
            }
          </div>

          <div className="add__bottom">
            <button className="add__bottom__btn">
              <ReactSVG path="/svg/photo.svg" />
              <p className="add__bottom__btn__txt">Add an image</p>
            </button>
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
  flushCache: () => dispatch(cacheFlush())
})

// @ts-ignore
export default connect(mstp, mdtp)(ConnectedAdd)
