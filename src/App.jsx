import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { getUserLogged, putAccessToken } from "./utils/api";
import { LocaleProvider } from "./contexts/LocaleContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";
import { SiGoogletranslate } from "react-icons/si";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import ArchivePage from "./pages/ArchivePage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: prevState.localeContext.locale === "id" ? "en" : "id",
              },
            };
          });
        },
      },
      themeContext: {
        theme: "dark",
        toggleTheme: () => {
          this.setState((prevState) => {
            return {
              themeContext: {
                ...prevState.themeContext,
                theme:
                  prevState.themeContext.theme === "dark" ? "light" : "dark",
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.themeContext.theme !== this.state.themeContext.theme) {
      document.documentElement.setAttribute(
        "data-theme",
        this.state.themeContext.theme
      );
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });

    putAccessToken("");
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <ThemeProvider value={this.state.themeContext}>
            <div className="app-container">
              <header>
                <h1>
                  <Link to="/">
                    {this.state.localeContext.locale === "id"
                      ? "Aplikasi Catatan Pribadi"
                      : "Personal Notes App"}
                  </Link>
                </h1>
                <button
                  className="toggle-locale"
                  onClick={this.state.localeContext.toggleLocale}
                >
                  <SiGoogletranslate />
                </button>
                <button
                  className="toggle-theme"
                  onClick={this.state.themeContext.toggleTheme}
                >
                  {this.state.themeContext.theme === "dark" ? (
                    <FiSun />
                  ) : (
                    <FiMoon />
                  )}
                </button>
              </header>
              <main>
                <Routes>
                  <Route
                    path="/*"
                    element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                  />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </LocaleProvider>
      );
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state.themeContext}>
          <div className="app-container">
            <header>
              <Navigation
                logout={this.onLogout}
                name={this.state.authedUser.name}
                toggleTheme={this.state.themeContext.toggleTheme}
              />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes/new" element={<AddPage />} />
                <Route path="/archives" element={<ArchivePage />} />
                <Route path="/notes/:id" element={<DetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </LocaleProvider>
    );
  }
}

export default App;
