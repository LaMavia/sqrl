import { State } from "../store";

export const mstp = (state: State) => ({
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
