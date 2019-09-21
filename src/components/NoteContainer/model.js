// import RequestManager from "../../utils/RequestManager";

export default class NoteContainerModel {
	constructor() {
		this.notes = [];
	}
	fetchNotes() {
		const notes = RequestManager.getNotes();
		this.notes = [...notes];
		return this.notes;
	}
}
