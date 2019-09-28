import Controller from "../../utils/Controller";
import View from "./view";
import Model from "./model";
import NoteCreator from "../NoteCreator";
import Note from "../Note";
import LogOutButton from "../LogOutButton";

export default class NoteContainer extends Controller {
	constructor(node) {
		super(node);
		this.model = new Model();
		this.view = new View();
		this.noteCreator = new NoteCreator(
			this.view.noteCreatorContainer,
			this.updateNotes.bind(this)
		);
		this.logOut = new LogOutButton(this.view.logOutContainer);
		this.notes = [];
		this.deleteNote = this.deleteNote.bind(this);
	}

	deleteNote() {
		this.updateNotes();
	}

	setNotes(notes) {
		this.notes = notes.map(
			note => new Note(this.view.macyContainer, note, this.deleteNote)
		);
	}

	clearNotes() {
		this.unmountNotes();
		this.notes = [];
	}

	initNotes() {
		this.notes.forEach(note => note.init());
	}

	mountNotes() {
		this.notes.forEach(note => note.mount());
	}

	unmountNotes() {
		this.notes.forEach(note => note.unmount());
	}

	async updateNotes() {
		this.clearNotes();
		const currentNoteList = await this.fetchNotes();
		this.setNotes(currentNoteList);
		this.initNotes();
		this.view.masonry.reInit();
	}
	fetchNotes() {
		return this.model.fetchNotes();
	}

	init() {
		super.init();
		this.initNotes();
	}

	mount() {
		super.mount();
		this.updateNotes();
		this.mountNotes();
	}

	unmount() {
		this.unmountNotes();
		super.unmount();
	}
}
