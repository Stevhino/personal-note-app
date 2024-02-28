import React from "react";
import PropTypes from "prop-types";

class LoginInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onEmailChangeHandler(e) {
    this.setState(() => {
      return {
        email: e.target.value,
      };
    });
  }

  onPasswordChangeHandler(e) {
    this.setState(() => {
      return {
        password: e.target.value,
      };
    });
  }

  onSubmitHandler(e) {
    e.preventDefault();

    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
  }

  render() {
    return (
      <div className="input-login">
        <form onSubmit={this.onSubmitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={this.state.email}
            onChange={this.onEmailChangeHandler}
            autoComplete="new-email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.onPasswordChangeHandler}
            autoComplete="new-password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
