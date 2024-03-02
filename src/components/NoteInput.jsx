import PropTypes from "prop-types";

function NoteInput({ title, body, onTitleChange, onBodyChange, onSubmit }) {
  function keyPressHandler(e) {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  }
  return (
    <div className="add-new-page__input">
      <form onSubmit={onSubmit}>
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder="Catatan rahasia"
          value={title}
          onChange={onTitleChange}
          onKeyPress={keyPressHandler}
        />
        <textarea
          className="add-new-page__input__body"
          type="text"
          placeholder="Sebenanya saya adalah ..."
          value={body}
          onChange={onBodyChange}
          onKeyPress={keyPressHandler}
        />
      </form>
    </div>
  );
}

NoteInput.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onBodyChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NoteInput;
