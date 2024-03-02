import PropTypes from "prop-types";
import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";
import NoteItem from "./NoteItem";

function NoteList({ notes }) {
  const { locale } = useContext(LocaleContext);
  if (notes.length > 0) {
    return (
      <section className="notes-list">
        {notes.map((note) => (
          <NoteItem key={note.id} id={note.id} {...note} />
        ))}
      </section>
    );
  }
  return (
    <section className="notes-list-empty">
      <p className="notes-list__empty">
        {locale === "id" ? "Tidak ada catatan" : "No notes"}
      </p>
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
