import React, { PureComponent } from 'react'

interface P {
	onClick: (args: any) => any
}

interface S {
	sy: number
}

export default class Modal extends PureComponent<P, S> {
	sy: number
	constructor(props: any) {
		super(props)

		this.sy = 0
	}

	handleTouchStart(e: any) {
		this.setState({
			// @ts-ignore
			sy: e.changedTouches[0].screenY,
		})
	}

	handleTouchEnd(e: any) {
    console.log(e.changedTouches[0].screenY - this.state.sy)
    if (e.changedTouches[0].screenY - this.state.sy <= window.innerHeight * -0.8) {
			this.props.onClick({})
		}
	}

	render() {
		return (
			<div
				className="modal"
				onTouchStart={this.handleTouchStart.bind(this)}
				onTouchEnd={this.handleTouchEnd.bind(this)}
			>
				<div className="modal__click-catcher" onClick={this.props.onClick} />
				{this.props.children}
			</div>
		)
	}
}
