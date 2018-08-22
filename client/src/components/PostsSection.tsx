import React from "react"
import TxtPostsList from "./TxtPostsList";
import ImgPostsList from "./ImgPostsList";
import { connect } from "react-redux";
import { State } from "../store";
import { Dispatch } from "redux";
import { postOpen } from "../actions/post.actions";
import Modal from "./Modal";
import ImgPost from "./ImgPost";
import { Post } from "../types";
import TxtPost from "./TxtPost";

interface P {
  isOpen: boolean
  closePost: () => any
  currentPost: Post | null
}

const ConnectedPosts = ({ isOpen, closePost, currentPost }: P) => (
  <section className="posts">
    {
      (() => {
        if(isOpen && currentPost) {
          return (
            <Modal onClick={ closePost }>
              {
                (() => {
                  switch(!!currentPost.Image) {
                    case true: return <ImgPost />
                    case false: return <TxtPost />
                  }
                })()
              }
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
  isOpen: state.posts.open,
  currentPost: state.posts.currentPost
})

const mdtp = (dispatch: Dispatch) => ({
  closePost: () => {
    dispatch(postOpen(false))
  }
})
// @ts-ignore
export const Posts = connect(mstp, mdtp)(ConnectedPosts)     