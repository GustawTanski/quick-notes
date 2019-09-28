import RequestManager from "../../utils/RequestManager";

export default class NoteContainerModel {
	constructor() {
		this.notes = [];
	}
	async fetchNotes() {
		const response = await RequestManager.getNotes();
		if (response.status == 200) this.notes = [...response.data];
		return this.notes;
	}
}
