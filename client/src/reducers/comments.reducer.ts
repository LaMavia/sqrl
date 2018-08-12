import { 
  COMMENTS_ARE_LOADING,
  COMMENTS_ERRORED,
  COMMENTS_LOADED
} from "../actions/comments.actions"
import { Comment } from "../dtos/comment.dto";
import { Action, combineReducers } from "redux";

export interface CommentsState {
  list: Comment[]
  areLoading: boolean
  error: Error | null
}

export const InitialCommentsState: CommentsState = {
  areLoading: false,
  error: null,
  list: []
}

export interface CommentsLoadingAction extends Action {
  areLoading: boolean
}
function commentsLoadingReducer (areLoading: boolean = false, action: CommentsLoadingAction): boolean {
  switch(action.type){
    case COMMENTS_ARE_LOADING: return action.areLoading
    default: return areLoading
  }
}

export interface CommentsErrorAction extends Action {
  error: Error | null
}

function commentsErrorReducer (error: Error | null = null, action: CommentsErrorAction) {
  switch(action.type) {
    case COMMENTS_ERRORED: return action.error
    default: return error
  }
}

export interface CommentsListAction extends Action {
  comments: Comment[] | null
}

function commentsListReducer(list: Comment[] = [], action: CommentsListAction) {
  switch(action.type) {
    case COMMENTS_LOADED: return [
      ...list,
      ...(action.comments || []).filter(comment => 
				!list.some(stateComment => stateComment._id === comment._id)
			)
    ]

    default: return list
  }
}

export const commentsReducer = combineReducers<CommentsState>({
  areLoading: commentsLoadingReducer,
  error: commentsErrorReducer,
  list: commentsListReducer
})