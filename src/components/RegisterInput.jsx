import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  function onSubmitHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Password and password confirm must be same.");
    }

    register({
      name,
      email,
      password,
    });
  }

  return (
    <div className="input-register">
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={onNameChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={onPasswordChange}
        />
        <label htmlFor="confirm password">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-confirm-password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
