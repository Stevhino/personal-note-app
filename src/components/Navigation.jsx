import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { LocaleConsumer } from "../contexts/LocaleContext";

function Navigation({ logout, name }) {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <nav className="navigation">
            <ul>
              <li>
                <button className="toggle-locale" onClick={toggleLocale}>
                  {locale === "id" ? "en" : "id"}
                </button>
              </li>
              <li>
                <Link to="/archives">
                  {locale === "id" ? "Terarsip" : "Archived"}
                </Link>
              </li>
              <li>
                <button
                  className="button-logout"
                  onClick={logout}
                  title="Logout"
                >
                  {name}
                  <FiLogOut />
                </button>
              </li>
            </ul>
          </nav>
        );
      }}
    </LocaleConsumer>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
