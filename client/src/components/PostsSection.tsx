import React from "react"
import TxtPostsList from "./TxtPostsList";
import ImgPostsList from "./ImgPostsList";
import { connect } from "react-redux";
import { State } from "../store";
import { Dispatch } from "redux";
import { postOpen } from "../actions/post.actions";
import Modal from "./Modal";
import ImgPost from "./ImgPost";

interface P {
  isOpen: boolean
  closePost: () => any
}

const ConnectedPosts = ({ isOpen, closePost }: P) => (
  <section className="posts">
    {
      (() => {
        if(isOpen) {
          return (
            <Modal onClick={ closePost }>
              <ImgPost />
            </Modal>
          )
        }
      })()
    }
    <TxtPostsList />
    <ImgPostsList />
  </section>
)

const mstp = (state: State) => ({
  isOpen: state.posts.open
})

const mdtp = (dispatch: Dispatch) => ({
  closePost: () => {
    dispatch(postOpen(false))
  }
})

export const Posts = connect(mstp, mdtp)(ConnectedPosts)