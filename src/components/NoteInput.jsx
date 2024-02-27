import React from "react";
import PropTypes from "prop-types";
import Buttons from "./Buttons";
import { FaCheck } from "react-icons/fa6";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeHandler(e) {
    this.setState(() => {
      return {
        title: e.target.value,
      };
    });
  }

  onBodyChangeHandler(e) {
    this.setState(() => {
      return {
        body: e.target.value,
      };
    });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    if (this.state.title.trim() === "" && this.state.body.trim() === "") {
      alert("Input dan textarea tidak boleh kosong!");
      return;
    } else if (this.state.title.trim() === "") {
      alert("Input tidak boleh kosong!");
      return;
    } else if (this.state.body.trim() === "") {
      alert("Textarea tidak boleh kosong!");
      return;
    }

    this.props.addNote({
      title: this.state.title,
      body: this.state.body,
    });

    this.setState({
      title: "",
      body: "",
    });
  }
  render() {
    return (
      <>
        <div className="add-new-page__input">
          <form onSubmit={this.onSubmitHandler}>
            <input
              className="add-new-page__input__title"
              type="text"
              placeholder="Catatan rahasia"
              value={this.state.title}
              onChange={this.onTitleChangeHandler}
            />
            <textarea
              className="add-new-page__input__body"
              type="text"
              placeholder="Sebenanya saya adalah ..."
              value={this.state.body}
              onChange={this.onBodyChangeHandler}
            />
          </form>
        </div>
        <div className="add-new-page__action">
          <Buttons
            title="Simpan"
            onClick={this.onSubmitHandler}
            icon={<FaCheck />}
          />
        </div>
      </>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
