import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/api";
import { FaCheck } from "react-icons/fa6";
import NoteInput from "../components/NoteInput";
import Buttons from "../components/Buttons";

function AddPage() {
  const navigate = useNavigate();
  const [newNote, setNewNote] = useState({
    title: "",
    body: "",
  });

  function onTitleChangeHandler(e) {
    setNewNote((prevNewNote) => ({
      ...prevNewNote,
      title: e.target.value,
    }));
  }

  function onBodyChangeHandler(e) {
    setNewNote((prevNewNote) => ({
      ...prevNewNote,
      body: e.target.value,
    }));
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    if (newNote.title.trim() === "" && newNote.body.trim() === "") {
      alert("Input dan textarea tidak boleh kosong!");
      return;
    } else if (newNote.title.trim() === "") {
      alert("Input tidak boleh kosong!");
      return;
    } else if (newNote.body.trim() === "") {
      alert("Textarea tidak boleh kosong!");
      return;
    }

    await addNote(newNote);
    navigate("/");
  }

  return (
    <section className="add-new-page">
      <NoteInput
        title={newNote.title}
        body={newNote.body}
        onTitleChange={onTitleChangeHandler}
        onBodyChange={onBodyChangeHandler}
        onSubmit={onSubmitHandler}
      />
      <div className="add-new-page__action">
        <Buttons title="Simpan" onClick={onSubmitHandler} icon={<FaCheck />} />
      </div>
    </section>
  );
}

export default AddPage;
