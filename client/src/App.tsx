import React from "react"
import Nav from "./components/Nav"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./routes/Home";
import Login from "./routes/Login";

export default class App extends React.PureComponent {
	constructor(_props: any) {
		super(_props)
	}

	render() {
		const supportsHistory = 'pushState' in window.history
		return (
			<Router forceRefresh={!supportsHistory}>
				<div className="app">
					<Nav />
					<Switch>
						<Route path="/" exact component={Home}/>
						<Route path="/login" component={Login}/>
					</Switch>
				</div>
			</Router>
		)
	}
}