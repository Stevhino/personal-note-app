function NoteSearch({ titleSearch, onSearch }) {
  return (
    <div className="note-search">
      <input
        type="text"
        placeholder="Cari catatan..."
        value={titleSearch}
        onChange={onSearch}
      />
    </div>
  );
}

export default NoteSearch;
