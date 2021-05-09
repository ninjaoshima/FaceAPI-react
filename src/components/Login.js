import React, { Component } from 'react';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		// this.update = this.update.bind(this);
		// this.changeRoute = this.changeRoute.bind(this);
	}

	update(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	changeRoute(e)
	{
		e.preventDefault();
		if(this.state.email === ""){
			alert("Please enter name");
			return;
		}
		// this.props.changeEmail(this.state.email);
		this.props.history.push({
			pathname: "/face", 
			state: {
				email: this.state.email
			}});
	}

	render() {
		return (
			<div className="login-form">
				<div className="login">
					<form>
						<h2>Login</h2>
						<div className="username">
							<input
								type="text"
								placeholder="Username..."
								value={this.state.email}
								onChange={(e) => this.update(e)}
								name="email"
							/>
						</div>

						{/* <div className="password">
							<input
								type="password"
								placeholder="Password..."
								value={this.state.password}
								onChange={this.update}
								name="password"
							/>
						</div> */}

						<input type="submit" value="Login" onClick={(e) => this.changeRoute(e)} />
					</form>

					{/* <Link to="/register">Create an account</Link> */}
				</div>
			</div>
		);
	}
}

export default Login;
