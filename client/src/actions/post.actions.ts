import { Post } from "../dtos/post.dto"
import { Dispatch } from "redux"
import { sendQuery } from "../functions/sendQuery"

export const POSTS_ARE_LOADING = "POSTS_ARE_LOADING"
export const POSTS_ERRORED = "POSTS_ERRORED"
export const POSTS_LOADED = "POSTS_LOADED"

export const postsAreLoading = (yayOrNay: boolean) => ({
  type: POSTS_ARE_LOADING,
  areLoading: yayOrNay
})

export const postsErrorer = (error: Error) => ({
  type: POSTS_ERRORED,
  error
})

export const postsLoaded = (posts: Post[]) => ({
  type: POSTS_LOADED,
  posts
})


// Functions ---------------------------------------

/**
 * 
 * @param apiURL {string}
 * @param conditions {string}
 * @example getPosts("https://localhost:8000/graphql", `Likes: 2, Limit: 20`)
 */
export const getPosts = (apiURL: string, conditions: string) => 
  [apiURL, conditions].some(x => typeof x === "undefined") 
    // @ts-ignore because of "this" binding
    ? getPosts.bind(this, ...[apiURL, conditions, limit, skip]) 
    : (dispatch: Dispatch) => {

    dispatch(postsAreLoading(true))
    sendQuery(`
      {
        Posts(${conditions}) {
          _id
          Author
          Date
          Content
          Likes
          ImageURL
          Edited
        }
      }
    `, {}, apiURL)
				.then(res => res.json())
				.then(posts => dispatch(postsLoaded(posts.data.Posts)))
				.catch(err => dispatch(postsErrorer(new Error(err))))
        .finally(() => dispatch(postsAreLoading(false)))
        
  }

