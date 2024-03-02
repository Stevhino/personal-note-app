import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/api";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import LocaleContext from "../contexts/LocaleContext";

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const { locale } = useContext(LocaleContext);

  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  useEffect(() => {
    async function fetchNotesData() {
      const { data } = await getArchivedNotes();
      setNotes(data);
    }
    fetchNotesData();
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="archive-page">
      <h2>{locale === "id" ? "Catatan Arsip" : "Archived Notes"}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
    </section>
  );
}

export default ArchivePage;
