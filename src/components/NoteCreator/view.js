import View from "../../utils/View";
import { typeAlias } from "@babel/types";

/* Warstwa prezentacyjna */
export default class NoteCreatorView extends View {
	constructor() {
		super();

		this.element = document.createElement("form");
		this.element.classList.add("container");
		this.element.autocomplete = "off";

		let noteTitleGroup = this._noteTitleDOMCreator();
		let noteBodyGroup = this._noteBodyDOMCreator();
		let noteButtonGroup = this._noteSubmitButtonDOMCreator();
		this.children.push(noteTitleGroup, noteBodyGroup, noteButtonGroup);
	}

	get noteTitleInputID() {
		return "noteCreatorTitleInput";
	}

	get noteTextareaID() {
		return "noteCreatorTextArea";
	}

	_noteTitleDOMCreator() {
		let noteTitleGroup = document.createElement("div");
		noteTitleGroup.classList.add("form-group");

		let noteTitleLabel = document.createElement("label");
		noteTitleLabel.setAttribute("for", this.noteTitleInputID);
		noteTitleLabel.innerText = "Your note title:";

		let noteTitleInput = document.createElement("input");
		noteTitleInput.classList.add("form-control");
		noteTitleInput.setAttribute("id", this.noteTitleInputID);
		noteTitleInput.placeholder = "Your title here...";
		noteTitleInput.required = true;
		noteTitleInput.name = "title";

		noteTitleGroup.appendChild(noteTitleInput);
		noteTitleGroup.insertBefore(noteTitleLabel, noteTitleInput);

		return noteTitleGroup;
	}

	_noteBodyDOMCreator() {
		let noteBodyGroup = document.createElement("div");
		noteBodyGroup.classList.add("form-group");

		let noteBodyLabel = document.createElement("label");
		noteBodyLabel.setAttribute("for", this.noteTextareaID);
		noteBodyLabel.innerText = "Your note:";

		let noteBodyTextarea = document.createElement("textarea");
		noteBodyTextarea.classList.add("form-control");
		noteBodyTextarea.setAttribute("id", this.noteTextareaID);
		noteBodyTextarea.setAttribute("rows", "3");
		noteBodyTextarea.placeholder = "Your note text message...";
		noteBodyTextarea.required = true;
		noteBodyTextarea.name = "message";

		noteBodyGroup.appendChild(noteBodyTextarea);
		noteBodyGroup.insertBefore(noteBodyLabel, noteBodyTextarea);

		return noteBodyGroup;
	}

	_noteSubmitButtonDOMCreator() {
		const buttonText = "Submit";

		let noteSubmitButtonGroup = document.createElement("div");
		noteSubmitButtonGroup.classList.add("form-group");

		let submitButton = document.createElement("input");
		submitButton.setAttribute("type", "submit");
		submitButton.classList.add("btn", "btn-success");
		submitButton.innerText = buttonText;

		noteSubmitButtonGroup.appendChild(submitButton);

		return noteSubmitButtonGroup;
	}
}
