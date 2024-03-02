import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { login } from "../utils/api";
import LoginInput from "../components/LoginInput";
import LocaleContext from "../contexts/LocaleContext";

function LoginPage({ loginSuccess }) {
  const { locale } = useContext(LocaleContext);
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }
  return (
    <section className="login-page">
      <h2>
        {locale === "id"
          ? "Yuk, login untuk menggunakan aplikasi."
          : "Login to use app, please."}
      </h2>
      <LoginInput login={onLogin} />
      <p>
        {locale === "id" ? "Belum punya akun?" : "Don't have an account?"}
        <Link to="/register">
          {locale === "id" ? " Daftar di sini?" : " Register here"}
        </Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
