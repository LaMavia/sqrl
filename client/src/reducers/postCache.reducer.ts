import { Action } from "redux"
import {
  CACHE_FLUSH,
  CACHE_UPDATE,
  PostCacheInput
} from "../actions/postCache.actions"

export interface PostCacheState {
  Content: string
  Image: string | null
  ImageID: string
}

export const InitialPostCacheState: PostCacheState = {
  Content: "",
  Image: null,
  ImageID: ""
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


