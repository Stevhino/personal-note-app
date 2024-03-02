import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getActiveNotes } from "../utils/api";
import { FiPlus } from "react-icons/fi";
import NoteList from "../components/NoteList";
import Buttons from "../components/Buttons";
import SearchBar from "../components/SearchBar";
import LocaleContext from "../contexts/LocaleContext";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const { locale } = useContext(LocaleContext);

  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  useEffect(() => {
    async function fetchNotesData() {
      const { data } = await getActiveNotes();
      setNotes(data);
    }
    fetchNotesData();
  }, []);

  const navigate = useNavigate();
  function onAddHandler() {
    navigate("/notes/new");
  }

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="homepage">
      <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
      <div className="homepage__action">
        <Buttons title="Tambah" onClick={onAddHandler} icon={<FiPlus />} />
      </div>
    </section>
  );
}

export default HomePage;
