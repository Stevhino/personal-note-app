import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { getUserLogged, putAccessToken } from "./utils/api";
import { FiMoon, FiSun } from "react-icons/fi";
import { SiGoogletranslate } from "react-icons/si";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import ArchivePage from "./pages/ArchivePage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Navigation from "./components/Navigation";
import LocaleContext from "./contexts/LocaleContext";
import ThemeContext from "./contexts/ThemeContext";

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  function toggleLocale() {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  }

  const localeContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }

  const themeContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  useEffect(() => {
    async function fetchNotesData() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }
    fetchNotesData();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  async function onLogout() {
    setAuthedUser(null);
    putAccessToken("");
  }

  if (initializing) return null;

  if (authedUser === null) {
    return (
      <LocaleContext.Provider value={localeContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className="app-container">
            <header>
              <h1>
                <Link to="/">
                  {localeContextValue.locale === "id"
                    ? "Aplikasi Catatan Pribadi"
                    : "Personal Notes App"}
                </Link>
              </h1>
              <button
                className="toggle-locale"
                onClick={localeContextValue.toggleLocale}
              >
                <SiGoogletranslate />
              </button>
              <button
                className="toggle-theme"
                onClick={themeContextValue.toggleTheme}
              >
                {themeContextValue.theme === "dark" ? <FiSun /> : <FiMoon />}
              </button>
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className="app-container">
          <header>
            <Navigation
              logout={onLogout}
              name={authedUser.name}
              toggleTheme={themeContextValue.toggleTheme}
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
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

export default App;
