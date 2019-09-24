import Controller from "../../utils/Controller";
import View from "./view";
import Model from "./model";
import NoteCreator from "../NoteCreator";

export default class NoteContainer extends Controller {
	constructor(node) {
		super(node);
		this.model = new Model();
		this.view = new View();
		this.noteCreator = new NoteCreator(
			this.view.noteCreatorContainer,
			this.updateNotes
		);
		this.deleteNote = this.deleteNote.bind(this);
		this.updateNotes();
	}

	deleteNote(id) {
		this.model.deleteNote(id);
		this.updateNotes();
	}
	updateNotes() {
		this.view.clearNotes();
		const currentNoteList = this.fetchNotes();
		this.view.createNote(currentNoteList, this.deleteNote);
	}
	fetchNotes() {
		const notes = this.model.fetchNotes();
		return notes;
	}
}
