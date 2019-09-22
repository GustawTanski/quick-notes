import View from "../../utils/View";
import possibleColors from "./possibleColors.json";

export default class NoteCreatorView extends View {
	constructor(model) {
		super();

		this._initElement();

		this.noteTitleGroup = this._noteTitleDOMCreator();
		this.noteBodyGroup = this._noteBodyDOMCreator();
		this.noteColorSelectorGroup = this._noteColorSelectorDOMCreator();
		this.noteButtonGroup = this._noteSubmitButtonDOMCreator();
		this.postNoteFeedbackGroup = this._noteFeedbackGroupDOMCreator();

		this.dropdownDiv = this._dropdownForm();

		this.dropdownDiv.appendChild(this.noteTitleGroup);
		this.dropdownDiv.appendChild(this.noteBodyGroup);
		this.dropdownDiv.appendChild(this.noteColorSelectorGroup);
		this.dropdownDiv.appendChild(this.noteButtonGroup);
		this.dropdownDiv.appendChild(this.postNoteFeedbackGroup);

		this.children.push(this.dropdownDiv);
	}

	get noteTitleInputID() {
		return "noteCreatorTitleInput";
	}

	get noteMessageInputID() {
		return "noteCreatorMessageInput";
	}

	get formID() {
		return "dropdownColorSelector";
	}

	get noteCreatorID() {
		return "noteCreatorID";
	}

	_getColorsFromFile() {
		let stringHTML = "";
		for (let index in possibleColors) {
			const color = possibleColors[index];

			const optionStyle = `background-color: var(--${color});
			color: var(--${color});
			margin: 10px;
			border: 2px solid hsla(207, 8%, 45%, 0.2)`;

			const optionString = `<option value=${color} 
				class="btn" style="${optionStyle}">undefined</option>`;

			stringHTML += optionString;
		}

		return stringHTML;
	}

	_dropdownForm() {
		let div = document.createElement("div");
		div.style.padding = "5px";
		div.style.maxHeight = "80px";
		div.style.overflow = "hidden";
		div.style.transition = "all .3s ease";

		return div;
	}

	_initElement() {
		this.element = document.createElement("form");
		this.element.classList.add("container");
		this.element.id = this.formID;
		this.element.style.border = "1px solid gainsboro";
		this.element.style.padding = "10px 20px";
		this.element.style.borderRadius = "5px";
		this.element.autocomplete = "off";
	}

	_noteFeedbackGroupDOMCreator() {
		let container = document.createElement("div");
		return container;
	}

	postNotePostingFeedback(success, message) {
		let div = document.createElement("div");
		div.classList.add("alert");
		div.style.margin = "15px 0";
		div.innerText = message;
		div.setAttribute("role", "alert");

		if (success) {
			div.classList.add("alert-success");
		} else {
			div.classList.add("alert-danger");
		}

		this.postNoteFeedbackGroup.appendChild(div);
		setTimeout(() => {
			this.postNoteFeedbackGroup.removeChild(
				this.postNoteFeedbackGroup.childNodes[0]
			);
		}, 3000);
	}

	_noteTitleDOMCreator() {
		let noteTitleGroup = document.createElement("div");
		noteTitleGroup.classList.add("form-group");

		let noteTitleLabel = document.createElement("label");
		noteTitleLabel.setAttribute("for", this.noteTitleInputID);
		noteTitleLabel.innerText = "Title:";

		let noteTitleInput = document.createElement("input");
		noteTitleInput.classList.add("form-control");
		noteTitleInput.setAttribute("id", this.noteTitleInputID);
		noteTitleInput.placeholder = "Your title here...";
		noteTitleInput.name = "title";

		let divFeedback = document.createElement("div");
		divFeedback.classList.add("invalid-feedback");
		divFeedback.innerText = "Title must not be empty!";

		noteTitleGroup.appendChild(noteTitleInput);
		noteTitleGroup.insertBefore(noteTitleLabel, noteTitleInput);
		noteTitleGroup.appendChild(divFeedback);

		return noteTitleGroup;
	}

	_noteBodyDOMCreator() {
		let noteBodyGroup = document.createElement("div");
		noteBodyGroup.classList.add("form-group");

		let noteBodyLabel = document.createElement("label");
		noteBodyLabel.setAttribute("for", this.noteMessageInputID);
		noteBodyLabel.innerText = "Note:";

		let noteBodyTextarea = document.createElement("textarea");
		noteBodyTextarea.classList.add("form-control");
		noteBodyTextarea.setAttribute("id", this.noteMessageInputID);
		noteBodyTextarea.setAttribute("rows", "6");
		noteBodyTextarea.placeholder = "Your note text message...";
		noteBodyTextarea.required = false;
		noteBodyTextarea.name = "message";

		let divFeedback = document.createElement("div");
		divFeedback.classList.add("invalid-feedback");
		divFeedback.innerText = "Note must not be empty!";

		noteBodyGroup.appendChild(noteBodyTextarea);
		noteBodyGroup.insertBefore(noteBodyLabel, noteBodyTextarea);
		noteBodyGroup.appendChild(divFeedback);

		return noteBodyGroup;
	}

	_noteColorSelectorDOMCreator() {
		let colorSelectorGroup = document.createElement("div");
		colorSelectorGroup.classList.add("dropdown");

		const button = document.createElement("button");
		button.classList.add("btn", "dropdown-toggle");
		button.style.backgroundColor = "var(--secondary)";
		button.style.border = "2px solid hsla(207, 8%, 45%, 0.2)";
		button.style.width = "100%";
		button.style.color = "var(--light)";
		button.style.textAlign = "center";
		button.type = "button";
		button.setAttribute("id", this.formID);
		button.setAttribute("data-toggle", "dropdown");
		button.innerText = "Note Color";

		const dropdownDiv = document.createElement("div");
		dropdownDiv.setAttribute("aria-labelledby", this.formID);
		dropdownDiv.classList.add("dropdown-menu");
		dropdownDiv.style.flexWrap = "wrap";
		dropdownDiv.style.justifyContent = "space-between";

		let divFeedback = document.createElement("div");
		divFeedback.classList.add("invalid-feedback");
		divFeedback.innerText = "Choose color of your note!";

		colorSelectorGroup.appendChild(dropdownDiv);
		colorSelectorGroup.appendChild(button);
		colorSelectorGroup.appendChild(divFeedback);

		dropdownDiv.innerHTML = this._getColorsFromFile();

		return colorSelectorGroup;
	}

	_noteSubmitButtonDOMCreator() {
		const buttonText = "Save Note";

		let submitButtonGroup = document.createElement("div");
		submitButtonGroup.classList.add("row", "justify-content-center", "mt-4");

		let submitButton = document.createElement("input");
		submitButton.setAttribute("type", "submit");
		submitButton.classList.add("btn", "btn-primary", "btn-lg");
		submitButton.value = buttonText;

		submitButtonGroup.appendChild(submitButton);
		return submitButtonGroup;
	}

	setViewValues(model) {
		if (model.title !== "" && model.message !== "" && model.color !== "") {
			this.noteTitleGroup.querySelector("#" + this.noteTitleInputID).value =
				model.title;

			this.noteBodyGroup.querySelector("#" + this.noteMessageInputID).value =
				model.message;

			this.noteColorSelectorGroup.querySelector(
				".dropdown-toggle"
			).style.backgroundColor = `var(--${model.color})`;
			this.noteColorSelectorGroup.querySelector(
				".dropdown-toggle"
			).style.color = `var(--${model.color})`;
		}
	}

	showFeedback(model) {
		if (model.title === "")
			this.noteTitleGroup.lastChild.style.display = "block";
		if (model.message === "")
			this.noteBodyGroup.lastChild.style.display = "block";
		if (model.color === "")
			this.noteColorSelectorGroup.lastChild.style.display = "block";
	}

	hideFeedback() {
		this.noteTitleGroup.lastChild.style.display = "none";

		this.noteBodyGroup.lastChild.style.display = "none";

		this.noteColorSelectorGroup.lastChild.style.display = "none";
	}
}
