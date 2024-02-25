import PropTypes from "prop-types";
import { Component } from "react";

class NoteInput extends Component {
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
    const limit = 50;
    this.setState(() => {
      return {
        title: e.target.value.slice(0, limit),
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
      <div className="note-input">
        <h1>Buat Catatan</h1>
        <form onSubmit={this.onSubmitHandler}>
          <p className="note-input__title__char-limit">
            Sisa Input Karakter : {50 - this.state.title.length}{" "}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={this.state.title}
            onChange={this.onTitleChangeHandler}
          />
          <textarea
            className="note-input__body"
            type="text"
            placeholder="Tuliskan Catatanmu disini ..."
            value={this.state.body}
            onChange={this.onBodyChangeHandler}
          />
          <button type="submit">Buat</button>
        </form>
      </div>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
