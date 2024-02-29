import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

function SearchBar({ keyword, keywordChange }) {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="search-bar">
            <input
              type="text"
              placeholder={
                locale === "id"
                  ? "Cari berdasarkan judul ..."
                  : "Search by a title ..."
              }
              value={keyword}
              onChange={(e) => {
                keywordChange(e.target.value);
              }}
            />
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
