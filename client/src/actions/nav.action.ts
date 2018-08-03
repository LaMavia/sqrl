import { Dispatch } from "redux"

export const NAV_SECTION_OPEN = "NAV_SECTION_OPEN"
export const NAV_SECTION_CLOSE = "NAV_SECTION_CLOSE"
export const NAV_MODAL_OPEN = "NAV_MODAL_OPEN"
export const NAV_MODAL_CLOSE = "NAV_MODAL_CLOSE"

export const navSectionOpen = (section: string) => ({
  type: NAV_SECTION_OPEN,
  section
})

export const navSectionClose = (section: string) => ({
  type: NAV_SECTION_CLOSE,
  section
})

export const navModalOpen = (modal: string) => ({
  type: NAV_MODAL_OPEN,
  modal
})

export const navModalClose = (modal: string) => ({
  type: NAV_MODAL_CLOSE,
  modal
})

// Functions -------------------------------------------------------
export const openNavSection = (section: string) => (dispatch: Dispatch) => {
  dispatch(navSectionOpen(section))
}

export const closeNavSection = (section: string) => (dispatch: Dispatch) => {
  dispatch(navSectionClose(section))
}

export const openNavModal = (modal: string) => (dispatch: Dispatch) => {
  dispatch(navModalOpen(modal))
}

export const closeNavModal = (modal: string) => (dispatch: Dispatch) => {
  dispatch(navModalClose(modal))
}