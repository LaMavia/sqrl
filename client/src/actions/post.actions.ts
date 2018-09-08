import { Post } from "../dtos/post.dto"
import { Dispatch, Action } from "redux"
import { sendQuery } from "../functions/sendQuery"
import { getComments } from "./comments.actions";
import { PostCacheState } from "../reducers/postCache.reducer";

export const POSTS_ARE_LOADING = "POSTS_ARE_LOADING"
export const POSTS_ERRORED     = "POSTS_ERRORED"
export const POSTS_LOADED      = "POSTS_LOADED"

export const POST_IS_LOADING   = "POST_LOADING"
export const POST_OPEN         = "POST_OPEN"
export const POST_LOADED       = "POST_LOADED"
export const POST_ERRORED      = "POST_ERRORED"

export const POST_ADD          = "POST_ADD"

export const postsAreLoading = (yayOrNay: boolean) => ({
  type: POSTS_ARE_LOADING,
  areLoading: yayOrNay
})

export const postsErrored = (error: Error | null) => ({
  type: POSTS_ERRORED,
  error
})

export const postsLoaded = (posts: Post[]) => ({
  type: POSTS_LOADED,
  posts
})

export const postOpen = (yayOrNay: boolean) => ({
  type: POST_OPEN,
  open: yayOrNay
})

export const postIsLoading = (yayOrNay: boolean) => ({
  type: POST_IS_LOADING,
  isLoading: yayOrNay
})

export const postLoaded = (post: Post) => ({
  type: POST_LOADED,
  post
})

export const postErrored = (error: Error | null) => ({
  type: POST_ERRORED,
  error
})

interface PostAdd extends Action {
  post: {
    Author: string
    Content: string
    ImageID?: string | null
  }
}
/**
 * @param Post {Object}
 * @param Author {String} Id of post's author
 */
export const postAdd = (Post: PostCacheState, Author: string): PostAdd => ({
  type: POST_ADD,
  post: {
    Author,
    Content: Post.Content,
    ImageID: Post.ImageID
  }
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
    ? getPosts.bind(this, ...[apiURL, conditions]) 
    : (dispatch: Dispatch) => {
      
    dispatch(postsAreLoading(true))
    sendQuery(`
      {
        Posts(${conditions}) {
          _id
          Author {
            _id
            Name
            Username
            ProfileImageURL
          }
          Date
          Content
          Likes
          Image
          Edited
        }
      }
    `, {}, apiURL)
				.then(res => res.json())
				.then(posts => dispatch(postsLoaded(posts.data.Posts)))
				.catch(err => dispatch(postsErrored(new Error(err))))
        // .finally(() => dispatch(postsAreLoading(false)))
        dispatch(postsAreLoading(false))
        
  }

export const addPost = (Post: { Content: string, ImageID: string }, Author: string) =>
  (dispatch: Dispatch) => {
    let post: Post | undefined

    sendQuery(`
      mutation {
        postAdd(Author: "${Author}", Content: ${JSON.stringify(Post.Content)}, ImageID: "${Post.ImageID}") {
          _id
          Author {
            _id
            Name
            Username
            ProfileImageURL
          }
          Content
          Likes
          Edited
          Image
          Date
        }
      }
    `, {}, `${location.origin}/graphql`)
      .then(res => {
        debugger
        return res.json()
      })
      .then(r => {
        if(r.data.postAdd) {
          post = r.data.postAdd
          return dispatch(postsLoaded([r.data.postAdd]))
        }
        throw new Error(`Error(s) adding post: ${r.errors.join("; ")}`)
      })
      .catch(err => dispatch(postErrored(err)))

      return post
  }

export const loadPost = (_id: string, posts: Post[] = []) => (dispatch: Dispatch) => {
  dispatch(postIsLoading(true))
  let post: Post | undefined
  // Check if is in the posts
  post = posts.find(cPost => String(cPost._id) === _id)
  if(post) {
    return dispatch(postLoaded(post))
  }

  // GET from the api
  sendQuery(`
    query {
      Post(_id: "${String(_id)}") {
        _id
        Author {
          _id
          Name
          Username
          ProfileImageURL
        }
        Date
        Content
        Likes
        Image
        Edited
      }
    }
  `)
    .then(r => r.json())
    .then(({data}: {data: { Post: Post | null}}) => {
      
      if(data.Post) { // Server found it
        return post = data.Post
      }

      throw new Error("Post not found")
      
    })
    /**Fetching Comments for the post */
    .then(post => {
      getComments(`Post: "${String(post._id)}"`)(dispatch)
    })
    .catch(err => dispatch(postErrored(err)))
    // .finally(() => dispatch(postIsLoading(false)))
    dispatch(postIsLoading(false))

  return post
}
