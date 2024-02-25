import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, onArchive, archived }) {
  if (notes.length > 0) {
    return (
      <div className="notes-list">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            id={note.id}
            onDelete={onDelete}
            onArchive={onArchive}
            archived={archived}
            {...note}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="note-list__empty-message">Tidak Ada Catatan Saat Ini</div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default NoteList;
