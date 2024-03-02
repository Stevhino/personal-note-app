import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { SiGoogletranslate } from "react-icons/si";
import LocaleContext from "../contexts/LocaleContext";
import ThemeContext from "../contexts/ThemeContext";

function Navigation({ logout, name }) {
  const { locale, toggleLocale } = useContext(LocaleContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <h1>
        <Link to="/">
          {locale === "id" ? "Aplikasi Catatan Pribadi" : "Personal Notes App"}
        </Link>
      </h1>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/archives">
              {locale === "id" ? "Terarsip" : "Archived"}
            </Link>
          </li>
        </ul>
      </nav>
      <button className="toggle-locale" onClick={toggleLocale}>
        {<SiGoogletranslate />}
      </button>
      <button className="toggle-theme" onClick={toggleTheme}>
        {theme === "dark" ? <FiSun /> : <FiMoon />}
      </button>
      <button className="button-logout" onClick={logout} title="Logout">
        {name}
        <FiLogOut />
      </button>
    </>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
