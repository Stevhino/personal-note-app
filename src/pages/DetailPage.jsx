import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import Buttons from "../components/Buttons";
import NoteDetail from "../components/NoteDetail";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/local-data";
import { FiTrash2 } from "react-icons/fi";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  function deleteHandler(id, archived) {
    deleteNote(id);
    archived ? navigate("/archives") : navigate("/");
  }

  function archiveHandler(id) {
    archiveNote(id);
    navigate("/");
  }

  function unArchiveHandler(id) {
    unarchiveNote(id);
    navigate("/archives");
  }

  return (
    <DetailPage
      id={id}
      onDeleteButton={deleteHandler}
      onArchivedButton={archiveHandler}
      onUnArchiveButton={unArchiveHandler}
    />
  );
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
    };

    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onClickArchivedButton = this.onClickArchivedButton.bind(this);
    this.onClickUnArchiveButton = this.onClickUnArchiveButton.bind(this);
  }

  onClickDeleteButton() {
    this.props.onDeleteButton(this.props.id, this.state.note.archived);
  }

  onClickArchivedButton() {
    this.props.onArchivedButton(this.props.id);
  }

  onClickUnArchiveButton() {
    this.props.onUnArchiveButton(this.props.id);
  }

  render() {
    if (this.state.note === undefined) {
      return <p>Note dengan ID {this.props.id} tidak tersedia.</p>;
    }
    return (
      <section className="detail-page">
        <NoteDetail {...this.state.note} />
        <div className="detail-page__action">
          <Buttons
            title={this.state.note.archived ? "Aktifkan" : "Arsipkan"}
            onClick={
              this.state.note.archived
                ? this.onClickUnArchiveButton
                : this.onClickArchivedButton
            }
            icon={this.state.note.archived ? <BiArchiveOut /> : <BiArchiveIn />}
          />
          <Buttons
            title="Hapus"
            onClick={this.onClickDeleteButton}
            icon={<FiTrash2 />}
          />
        </div>
      </section>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  onDeleteButton: PropTypes.func.isRequired,
  onArchivedButton: PropTypes.func.isRequired,
  onUnArchiveButton: PropTypes.func.isRequired,
};

export default DetailPageWrapper;
