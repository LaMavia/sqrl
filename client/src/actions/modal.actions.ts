import { Dispatch } from 'redux'

export const MODAL_OPEN = 'MODAL_OPEN'
export const MODAL_CLOSE = 'MODAL_CLOSE'
export const MODAL_CLOSE_ALL = 'MODAL_CLOSE_ALL'

export const modalOpen = (name: string) => ({
	type: MODAL_OPEN,
	name,
})

export const modalClose = (name: string) => ({
	type: MODAL_CLOSE,
	name,
})

export const modalCloseAll = () => ({
	type: MODAL_CLOSE_ALL,
})

export const openModal = (name: string) => (dispatch: Dispatch) =>
	dispatch(modalOpen(name))

export const closeModal = (name: string) => (dispatch: Dispatch) =>
	dispatch(modalClose(name))

export const closeAllModals = (dispach: Dispatch) => dispach(modalCloseAll())
