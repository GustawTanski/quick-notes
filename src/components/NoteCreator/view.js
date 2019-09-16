import View from "../../utils/View";
import { typeAlias } from "@babel/types";

/* Warstwa prezentacyjna */
export default class NoteCreatorView extends View {
	constructor() {
		super();

		this.element = document.createElement("form");
		this.element.classList.add("container");

		let noteTitleGroup = this._noteTitleDOMCreator();
		let noteBodyGroup = this._noteBodyDOMCreator();
		let noteButtonGroup = this._noteSubmitButtonDOMCreator();
		this.children.push(noteTitleGroup, noteBodyGroup, noteButtonGroup);
	}

	_noteTitleDOMCreator() {
		const titleInputId = "noteCreatorTitleInput";
		let noteTitleGroup = document.createElement("div");
		noteTitleGroup.classList.add("form-group");

		let noteTitleLabel = document.createElement("label");
		noteTitleLabel.setAttribute("id", titleInputId);
		noteTitleLabel.innerText = "Your note title:";

		let noteTitleInput = document.createElement("input");
		noteTitleInput.classList.add("form-control");
		noteTitleInput.setAttribute("id", titleInputId);
		noteTitleInput.placeholder = "Your title here";

		noteTitleGroup.appendChild(noteTitleInput);
		noteTitleGroup.insertBefore(noteTitleLabel, noteTitleInput);

		return noteTitleGroup;
	}

	_noteBodyDOMCreator() {
		const textareaId = "noteCreatorTextArea";

		let noteBodyGroup = document.createElement("div");
		noteBodyGroup.classList.add("form-group");

		let noteBodyLabel = document.createElement("label");
		noteBodyLabel.setAttribute("for", textareaId);
		noteBodyLabel.innerText = "Your note:";

		let noteBodyTextarea = document.createElement("textarea");
		noteBodyTextarea.classList.add("form-control");
		noteBodyTextarea.setAttribute("id", textareaId);
		noteBodyTextarea.setAttribute("rows", "3");

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
