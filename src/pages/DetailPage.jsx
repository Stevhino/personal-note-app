import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/api";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import Buttons from "../components/Buttons";
import NoteDetail from "../components/NoteDetail";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);

  useEffect(() => {
    async function fetchNotesData() {
      const { data } = await getNote(id);
      setNote(data);
    }
    fetchNotesData();
  }, [id]);

  async function deleteNoteHandler() {
    await deleteNote(id);
    note.archived ? navigate("/archives") : navigate("/");
  }

  async function archiveNoteHandler() {
    await archiveNote(id);
    navigate("/");
  }

  async function unArchiveNoteHandler() {
    await unarchiveNote(id);
    navigate("/archives");
  }

  if (!note) {
    return <p>Loading...</p>; // Render loading indicator while fetching data
  }

  return (
    <section className="detail-page">
      <NoteDetail {...note} />
      <div className="detail-page__action">
        <Buttons
          title={note.archived ? "Aktifkan" : "Arsipkan"}
          onClick={note.archived ? unArchiveNoteHandler : archiveNoteHandler}
          icon={note.archived ? <BiArchiveOut /> : <BiArchiveIn />}
        />
        <Buttons
          title="Hapus"
          onClick={deleteNoteHandler}
          icon={<FiTrash2 />}
        />
      </div>
    </section>
  );
}

export default DetailPage;
