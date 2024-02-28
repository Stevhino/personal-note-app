import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import Buttons from "../components/Buttons";
import NoteDetail from "../components/NoteDetail";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/api";
import { FiTrash2 } from "react-icons/fi";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  async function deleteHandler(id, archived) {
    await deleteNote(id);
    archived ? navigate("/archives") : navigate("/");
  }

  async function archiveHandler(id) {
    await archiveNote(id);
    navigate("/");
  }

  async function unArchiveHandler(id) {
    await unarchiveNote(id);
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
      note: null,
    };

    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onClickArchivedButton = this.onClickArchivedButton.bind(this);
    this.onClickUnArchiveButton = this.onClickUnArchiveButton.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props;
    const { data } = await getNote(id);

    this.setState(() => {
      return {
        note: data,
      };
    });
  }

  onClickDeleteButton() {
    const { id } = this.props;
    const { note } = this.state;
    this.props.onDeleteButton(id, note.archived);
  }

  onClickArchivedButton() {
    const { id } = this.props;
    this.props.onArchivedButton(id);
  }

  onClickUnArchiveButton() {
    const { id } = this.props;
    this.props.onUnArchiveButton(id);
  }

  render() {
    const { note } = this.state;

    if (!note) {
      return <p>Loading...</p>; // Render loading indicator while fetching data
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
