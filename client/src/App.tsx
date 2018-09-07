import React from "react"
import Nav from "./components/Nav"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Home from "./routes/Home";
import Login from "./routes/Login";
import { getCookies } from "./functions/getCookies"
import { State } from "./store";
import { Dispatch } from "redux";
import { loginWithID } from "./actions/user.actions";
import { User } from "./dtos/user.dto";
import Register from "./routes/Register";
import UserProfile from "./routes/UserProfile";
import { connect } from "react-redux";

interface Props {
	loginWithID: (_id: string) => any
	user: User
}
const mstp = (state: State) => ({
	user: state.user.me
})

const mdtp = (dispatch: Dispatch) => ({
	loginWithID: (_id: string) => dispatch(loginWithID(`${location.origin}/graphql`, _id)),
})

export class App extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props)
	}

	render() {
		const supportsHistory = 'pushState' in window.history
		const { UserID: _id } = getCookies()
		if(_id && !this.props.user && _id !== "undefined") {
			this.props.loginWithID(_id)
		}

		return (
			<Router forceRefresh={!supportsHistory}>
				<div className="app">
					<Nav />
					<Switch>
						<Route path="/" exact component={Home}/>
						<Route path="/login" component={Login}/>
						<Route path="/register" component={Register}/>
						<Route path="/user/:username" component={UserProfile}/>
						<Route path="*" render={() => <Redirect to="/"/>}/>
					</Switch>
				</div>
			</Router>
		)
	}
}

export default connect(mstp, mdtp)(App)