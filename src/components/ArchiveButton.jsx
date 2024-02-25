import PropTypes from "prop-types";

function ArchiveButton({ id, onArchive, archived }) {
  if (!archived) {
    return (
      <button
        className="note-item__archive-button"
        onClick={() => onArchive(id)}
      >
        {archived}Archive
      </button>
    );
  }
  return (
    <button className="note-item__archive-button" onClick={() => onArchive(id)}>
      {archived}Unarchive
    </button>
  );
}

ArchiveButton.propTypes = {
  id: PropTypes.number.isRequired,
  onArchive: PropTypes.func.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default ArchiveButton;
