/* Warstwa informacyjna, aktualny stan komponentu*/
export default class NoteCreatorModel {
	constructor(title = "", message = "", color = "") {
		this.title = title;
		this.message = message;
		this.color = color;
	}
}
