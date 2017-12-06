import React, { Component } from 'react';

class AuthForm extends Component {
  //recieve props object
  constructor(props) {
    //initialize state by calling super with props
    super(props);

    //actual state initialization
    this.state = { email: '', password: '' };

  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (

      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} className="col s6">
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.setState.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="errors">
              {this.props.errors.map(error => <div key={error}>{error}</div>)}
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
