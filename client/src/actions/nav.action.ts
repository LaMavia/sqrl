import { Dispatch } from "redux"

export const NAV_SECTION_OPEN = "NAV_SECTION_OPEN"
export const NAV_SECTION_CLOSE = "NAV_SECTION_CLOSE"
export const NAV_SECTION_SWITCH = "NAV_SECTION_SWITCH"

export const navSectionOpen = (section: string) => ({
  type: NAV_SECTION_OPEN,
  section
})

export const navSectionClose = (section: string) => ({
  type: NAV_SECTION_CLOSE,
  section
})

export const navSectionSwitch = (section: string) => ({
  type: NAV_SECTION_SWITCH,
  section
})

// Functions -------------------------------------------------------
export const switchNavSection = (section: string) => (dispatch: Dispatch) => {
  dispatch(navSectionSwitch(section))
}

export const closeNavSection = (section: string) => (dispatch: Dispatch) => {
  dispatch(navSectionClose(section))
}