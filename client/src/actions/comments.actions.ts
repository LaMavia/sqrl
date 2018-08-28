import { Comment } from "../dtos/comment.dto";
import { Dispatch } from "redux";
import { sendQuery } from "../functions/sendQuery";

export const COMMENTS_LOADED      = "COMMENTS_LOADED"
export const COMMENTS_ERRORED     = "COMMENTS_ERRORED"
export const COMMENTS_ARE_LOADING = "COMMENTS_ARE_LOADING"
export const COMMENTS_ADD         = "COMMENTS_ADD" 

export const commentsLoaded = (comments: Comment[]) => ({
  type: COMMENTS_LOADED,
  comments
})

export const commentsErrored = (error: Error | null) => ({
  type: COMMENTS_ERRORED,
  error
})

export const commentsAreLoading = (yayOrNay: boolean) => ({
  type: COMMENTS_ARE_LOADING,
  areLoading: yayOrNay
})

export const commentsAdd = (comment: Comment) => ({
  type: COMMENTS_ADD,
  comment
})

export const getComments = (conditions: string) => (dispatch: Dispatch) => {
  dispatch(commentsAreLoading(true))
  sendQuery(`
    query {
      Comments(${conditions}) {
        _id
        Author {
          _id
          Name
          Username
          ProfileImageURL
        }
        Date
        Content
        Post {
          _id
        }
      }
    }
  `)
    .then(r => r.json())
    .then((res: { data: { Comments: Comment[] | null } }) => {
      const { data } = res
      if(data.Comments) {
        return dispatch(commentsLoaded(data.Comments))
      } 
      throw new Error("Failed fetching comments")
    })
    .catch(err => dispatch(commentsErrored(err)))
    // .finally(() => dispatch(commentsAreLoading(false)))
    dispatch(commentsAreLoading(false))
}

export const addComment = (Content: string, Author: string, Post: string) => (dispatch: Dispatch) => {
  sendQuery(`
    mutation {
      commentAdd(Author: "${Author}", Content: ${JSON.stringify(Content)}, Post: "${Post}") {
        _id
        Author {
          _id
          Name
          Username
          ProfileImageURL
        }
        Date
        Content
        Post {
          _id
        }
      }
    }
  `, {}, `${location.origin}/graphql`)
    .then(r => r.json()||new Error(`JSON not returned: ${JSON.stringify(r)}`))
    .then(r => {
      if(!(r.data && r.data.commentAdd)) throw new Error(`CommentAdd query returned null\nError(s): ${r.errors&&JSON.stringify(r.errors)}`)

      debugger
      dispatch(commentsLoaded([r.data.commentAdd]))
    })
    .catch(err => {
      dispatch(commentsErrored(err))
      console.error(`Error fetching comments: ${err}`)
    })
}