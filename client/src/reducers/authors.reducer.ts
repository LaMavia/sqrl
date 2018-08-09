import { Action } from "redux"
import { User } from "../dtos/user.dto"
import { AUTHORS_LOADED } from "../actions/authors.actions";

export type AuthorsState = User[]
export const InitialAuthorsState: AuthorsState = []


interface AuthorsAction extends Action {
  authors: User[]
}
export function authorsReducer(authors: User[] = [], action: AuthorsAction) {
  switch(action.type) {
    case AUTHORS_LOADED: return [
			...authors, ...(action.authors || []).filter(author => 
				!authors.some(stateAuthor => Object.is(author, stateAuthor))
			)
    ]
    default: return authors
  }
}


