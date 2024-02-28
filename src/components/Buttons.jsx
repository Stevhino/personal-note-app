import PropTypes from "prop-types";

function Buttons({ title, onClick, icon }) {
  return (
    <button className="action" type="button" title={title} onClick={onClick}>
      {icon}
    </button>
  );
}

Buttons.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
};

export default Buttons;
