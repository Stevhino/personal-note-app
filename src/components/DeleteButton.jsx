import PropTypes from "prop-types";

function DeleteButton({ onDelete, id }) {
  return (
    <button className="note-item__delete-button" onClick={() => onDelete(id)}>
      Delete
    </button>
  );
}

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default DeleteButton;
