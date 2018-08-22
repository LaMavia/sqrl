import React from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { switchNavSection, closeNavSection, openNavModal } from "../actions/nav.action"
import { Section, NavLink as INavLink, NavButton } from "../reducers/nav.reducer"
import ReactSVG from "react-svg"
import { NavLink } from "react-router-dom"
import { State } from "../store";

const connectedNav = ({sections, links, modals, switchSection, closeSection, openModal}: any) => {
  let i = 0
  const renderSections = (sections: {[name: string]: Section}) => {
    const renderedList = []
    for(const name in sections) {
      const s = sections[name]
      renderedList.unshift((
          <li className="nav__items__item" key={ i++ }>
            <button className="nav__items__item__btn">
              <ReactSVG className="nav__items__item__btn__icon" path={ s.icon } onClick={ switchSection(name) } />
            </button>
            <ul className={`nav__items__item__drawer ${s.open ? "nav__items__item__drawer--open" : ""}`}>
              {
                s.items.map((item, i) => (
                  <li className="nav__items__item__drawer__item" key={i}>
                    <NavLink className="nav__items__item__drawer__item__link" onClick={closeSection(name)} to={ item.href }>{ item.name }</NavLink>
                  </li>
                ))
              }
            </ul>
          </li>
      ))
    }

    return renderedList
  }

  const renderLinks = (links: INavLink[]) => 
    links && links.map(link => (
      <li className="nav__items__item" key={ i++ }>
        <NavLink to={ link.href } className="nav__items__item__link">
          <ReactSVG path={ link.icon } className="nav__items__item__link__icon"/>
        </NavLink>
      </li>
    ))

  const renderModals = (btns: NavButton[]) => 
    btns && btns.map(btn => {
      const Modal: any = btn.modal
      return (
        <li className="nav__items__item" key={ i++ }>
          <button className="nav__items__item__btn" onClick={ openModal(btn.name) }>
            <ReactSVG className="nav__items__item__btn__icon" path={ btn.icon }/>
          </button>
          <div className="nav__items__item__modal" style={{visibility: btn.open ? "visible" : "hidden"}}>
            {(() => btn.open&&<Modal/>)()}
          </div>
        </li>
      )
    })

  return (
    <nav className="nav">
      <ul className="nav__items">
        {renderSections(sections)}
        {renderLinks(links)}
        {renderModals(modals)}
      </ul>
    </nav>
  )
}

const mapStateToProps = (state: State) => ({
  sections: state.nav.sections,
  links: state.nav.links,
  modals: state.nav.modals,
  user: state.user.me
})
const mapDispatchToProps = (_dispatch: Dispatch) => ({
  switchSection: (section: string) => switchNavSection(section).bind({}, _dispatch),
  closeSection: (section: string) => closeNavSection(section).bind({}, _dispatch),
  openModal: (modal: string) => openNavModal(modal).bind({}, _dispatch),
  // closeModal: (modal: string) => closeNavModal(modal).bind({}, _dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(connectedNav)