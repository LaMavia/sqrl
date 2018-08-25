import {
	MODAL_CLOSE,
	MODAL_OPEN,
	MODAL_CLOSE_ALL,
} from '../actions/modal.actions'
import { Action } from 'redux'
import AddPostModal from '../components/AddPost.modal'
import AddCommentModal from '../components/AddComment.modal';

export interface Modal {
	name: string
	component: any
	open: boolean
}

export const InitialModalState: Modal[] = [
	{
		name: 'AddPost',
		component: AddPostModal,
		open: false,
  },
  {
    name: 'AddComment',
    component: AddCommentModal,
    open: false
  }
]

export interface ModalAction extends Action {
	name: string
}

export const modalReducer = (
	modals: Modal[] = InitialModalState,
	action: ModalAction
) => {
	switch (action.type) {
		case MODAL_OPEN: {
			return modals.map(modal => ({
				...modal,
				open: modal.name === action.name ? true : modal.open,
			}))
		}

		case MODAL_CLOSE: {
			return modals.map(modal => ({
				...modal,
				open: modal.name === action.name ? false : modal.open,
			}))
		}

		case MODAL_CLOSE_ALL: {
			return modals.map(modal => ({
				...modal,
				open: false,
			}))
		}

		default:
			return modals
	}
}
