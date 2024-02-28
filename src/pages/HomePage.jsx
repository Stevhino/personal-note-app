import React from "react";
import PropTypes from "prop-types";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getActiveNotes } from "../utils/api";
import NoteList from "../components/NoteList";
import Buttons from "../components/Buttons";
import SearchBar from "../components/SearchBar";
import { FiPlus } from "react-icons/fi";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  const navigate = useNavigate();
  function addHandler() {
    navigate("/notes/new");
  }

  return (
    <HomePage
      defaultKeyword={keyword}
      keywordChange={changeSearchParams}
      onAddHandler={addHandler}
    />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || "",
    };
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: data,
      };
    });
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });
    return (
      <section className="homepage">
        <h2>Catatan Aktif</h2>
        <SearchBar
          keyword={this.state.keyword}
          keywordChange={this.onKeywordChangeHandler}
        />
        <NoteList notes={notes} />
        <div className="homepage__action">
          <Buttons
            title="Tambah"
            onClick={this.props.onAddHandler}
            icon={<FiPlus />}
          />
        </div>
      </section>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
  onAddHandler: PropTypes.func.isRequired,
};

export default HomePageWrapper;
