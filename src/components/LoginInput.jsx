import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  function onSubmitHandler(e) {
    e.preventDefault();
    login({
      email,
      password,
    });
  }

  return (
    <div className="input-login">
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          autoComplete="new-email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          autoComplete="new-password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
