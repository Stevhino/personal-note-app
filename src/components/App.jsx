import NoteList from "./NoteList";
import NoteInput from "./NoteInput";
import NoteSearch from "./NoteSearch";
import { getInitialData } from "../utils";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      search: "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onSearchEventHandler = this.onSearchEventHandler.bind(this);
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onAddNoteHandler({ title, body }) {
    const newDate = new Date().toLocaleDateString();
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: newDate,
            archived: false,
          },
        ],
      };
    });
  }

  onArchiveHandler(id) {
    const archiveNote = this.state.notes.map((note) => {
      if (note.id === id) {
        return { ...note, archived: !note.archived };
      } else {
        return note;
      }
    });
    this.setState({ notes: archiveNote });
  }

  onSearchEventHandler(e) {
    this.setState(() => {
      return {
        search: e.target.value,
      };
    });
  }

  render() {
    const search = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.search.toLowerCase())
    );
    const unArchive = search.filter((note) => {
      return note.archived === false;
    });
    const archived = search.filter((note) => {
      return note.archived === true;
    });
    return (
      <>
        <div className="note-app__header">
          <h1>Notes App</h1>
          <NoteSearch onSearch={this.onSearchEventHandler} />
        </div>
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <h2>Catatan Aktif</h2>
          <NoteList
            notes={unArchive}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
            archived={false}
          />
          <h2>Arsip Catatan</h2>
          <NoteList
            notes={archived}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
            archived={true}
          />
        </div>
      </>
    );
  }
}

// function App() {
//   const notes = getInitialData();
//   return (
//     <>
//       <div className="note-app__body">
//         <NoteList notes={notes} />
//       </div>
//     </>
//   );
// }

export default App;
