import React from "react";
import PropTypes from "prop-types";

class RegisterInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
    };

    this.onNameChange = this.onNamaChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onNamaChange(e) {
    this.setState(() => {
      return {
        name: e.target.value,
      };
    });
  }

  onEmailChange(e) {
    this.setState(() => {
      return {
        email: e.target.value,
      };
    });
  }

  onPasswordChange(e) {
    this.setState(() => {
      return {
        password: e.target.value,
      };
    });
  }

  onSubmitHandler(e) {
    e.preventDefault();

    this.props.register({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    });
  }

  render() {
    return (
      <div className="input-register">
        <form onSubmit={this.onSubmitHandler}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Nama"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
