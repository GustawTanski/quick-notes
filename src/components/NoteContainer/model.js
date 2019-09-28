import RequestManager from "../../utils/RequestManager";

export default class NoteContainerModel {
	constructor() {
		this.notes = [];
	}
	deleteNote(id) {
		const newNotes = this.notes.filter(note => note.noteId !== id);
		this.notes = newNotes;
	}
	fetchNotes() {
		const notes = RequestManager.getNotes();
		this.notes = [...notes];
		return this.notes;
	}
}
