import { Action } from "redux"
import {
  CACHE_FLUSH,
  CACHE_UPDATE,
  PostCacheInput
} from "../actions/postCache.actions"

export interface PostCacheState {
  Content: string
  ImageURL: string
}

export const InitialPostCacheState: PostCacheState = {
  Content: "",
  ImageURL: "https://images.pexels.com/photos/1164675/pexels-photo-1164675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
} 

interface PostCacheAction extends Action {
  input: PostCacheInput
}

export const postCacheReducer = (state = InitialPostCacheState, action: PostCacheAction) => {
  switch(action.type) {
    case CACHE_UPDATE:
      return Object.assign({}, state, action.input)

    /**
     * Left for readability
     */
    case CACHE_FLUSH:
      return InitialPostCacheState

    default: return state
  }
}


