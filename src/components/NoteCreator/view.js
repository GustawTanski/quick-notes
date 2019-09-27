import View from "../../utils/View";
import possibleColors from "./possibleColors.json";

export default class NoteCreatorView extends View {
	constructor(model) {
		super();

		this._setupParentElement();

		this.noteTitleGroup = this._noteTitleDOMCreator();
		this.noteContentGroup = this._noteContentDOMCreator();
		this.noteColorSelectorGroup = this._noteColorSelectorDOMCreator();
		this.noteSubmitButtonGroup = this._noteSubmitButtonDOMCreator();
		this.postNoteFeedbackGroup = this._notePostingResultGroupDOMCreator();

		this.dropdownDiv = this._dropdownFormContainerDOMCreator();

		this.dropdownDiv.appendChild(this.noteTitleGroup);
		this.dropdownDiv.appendChild(this.noteContentGroup);
		this.dropdownDiv.appendChild(this.noteColorSelectorGroup);
		this.dropdownDiv.appendChild(this.noteSubmitButtonGroup);
		this.dropdownDiv.appendChild(this.postNoteFeedbackGroup);

		this.children.push(this.dropdownDiv);
	}

	get noteTitleInputID() {
		return "noteCreatorTitleInput";
	}

	get noteContentInputID() {
		return "noteCreatorContentInput";
	}

	get formID() {
		return "noteCreatorForm";
	}

	_possibleColorsDOMCreator() {
		let dropdownContentInnerHTML = "";
		for (let index in possibleColors) {
			const color = possibleColors[index];

			const optionStyle = `background-color: var(--${color});
			color: var(--${color});
			margin: 10px;
			border: 2px solid hsla(207, 8%, 45%, 0.2)`;

			const optionInnerHTML = `<option value=${color} 
				class="btn" style="${optionStyle}">undefined</option>`;

			dropdownContentInnerHTML += optionInnerHTML;
		}

		return dropdownContentInnerHTML;
	}

	_dropdownFormContainerDOMCreator() {
		let div = document.createElement("div");
		div.style.padding = "5px";
		div.style.maxHeight = "80px";
		div.style.overflow = "hidden";
		div.style.transition = "all .3s ease";

		return div;
	}

	_setupParentElement() {
		this.element = document.createElement("form");
		this.element.classList.add("container");
		this.element.id = this.formID;
		this.element.style.border = "1px solid gainsboro";
		this.element.style.padding = "10px 20px";
		this.element.style.borderRadius = "5px";
		this.element.autocomplete = "off";
	}

	_notePostingResultGroupDOMCreator() {
		let container = document.createElement("div");
		return container;
	}

	notePostingResultDiv(success, message) {
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
		noteTitleLabel.innerText = "Create new note:";

		let noteTitleInput = document.createElement("input");
		noteTitleInput.classList.add("form-control");
		noteTitleInput.setAttribute("id", this.noteTitleInputID);
		noteTitleInput.placeholder = "Your title here...";
		noteTitleInput.name = "title";

		let titleValidationFeedback = document.createElement("div");
		titleValidationFeedback.classList.add("invalid-feedback");
		titleValidationFeedback.innerText = "Title must not be empty!";

		noteTitleGroup.appendChild(noteTitleInput);
		noteTitleGroup.insertBefore(noteTitleLabel, noteTitleInput);
		noteTitleGroup.appendChild(titleValidationFeedback);

		return noteTitleGroup;
	}

	_noteContentDOMCreator() {
		let noteContentGroup = document.createElement("div");
		noteContentGroup.classList.add("form-group");

		let noteContentLabel = document.createElement("label");
		noteContentLabel.setAttribute("for", this.noteContentInputID);
		noteContentLabel.innerText = "Note:";

		let noteContentTextarea = document.createElement("textarea");
		noteContentTextarea.classList.add("form-control");
		noteContentTextarea.setAttribute("id", this.noteContentInputID);
		noteContentTextarea.setAttribute("rows", "6");
		noteContentTextarea.placeholder = "Your note content...";
		noteContentTextarea.required = false;
		noteContentTextarea.name = "content";

		let noteContentValidationFeedback = document.createElement("div");
		noteContentValidationFeedback.classList.add("invalid-feedback");
		noteContentValidationFeedback.innerText = "Note must not be empty!";

		noteContentGroup.appendChild(noteContentTextarea);
		noteContentGroup.insertBefore(noteContentLabel, noteContentTextarea);
		noteContentGroup.appendChild(noteContentValidationFeedback);

		return noteContentGroup;
	}

	_noteColorSelectorDOMCreator() {
		let colorSelectorGroup = document.createElement("div");
		colorSelectorGroup.classList.add("dropdown");

		const dropdownButton = document.createElement("button");
		dropdownButton.classList.add("btn", "dropdown-toggle");
		dropdownButton.style.backgroundColor = "var(--secondary)";
		dropdownButton.style.border = "2px solid hsla(207, 8%, 45%, 0.2)";
		dropdownButton.style.width = "100%";
		dropdownButton.style.color = "var(--light)";
		dropdownButton.style.textAlign = "center";
		dropdownButton.type = "button";
		dropdownButton.setAttribute("id", this.formID);
		dropdownButton.setAttribute("data-toggle", "dropdown");
		dropdownButton.innerText = "Note Color";

		const dropdownContent = document.createElement("div");
		dropdownContent.setAttribute("aria-labelledby", this.formID);
		dropdownContent.classList.add("dropdown-menu");
		dropdownContent.style.flexWrap = "wrap";
		dropdownContent.style.justifyContent = "space-between";

		let noteColorSelectorValidationFeedback = document.createElement("div");
		noteColorSelectorValidationFeedback.classList.add("invalid-feedback");
		noteColorSelectorValidationFeedback.innerText =
			"Choose color of your note!";

		colorSelectorGroup.appendChild(dropdownContent);
		colorSelectorGroup.appendChild(dropdownButton);
		colorSelectorGroup.appendChild(noteColorSelectorValidationFeedback);

		dropdownContent.innerHTML = this._possibleColorsDOMCreator();

		return colorSelectorGroup;
	}

	_noteSubmitButtonDOMCreator() {
		let submitButtonGroup = document.createElement("div");
		submitButtonGroup.classList.add("row", "justify-content-center", "mt-4");

		let submitButton = document.createElement("input");
		submitButton.setAttribute("type", "submit");
		submitButton.classList.add("btn", "btn-primary", "btn-lg");
		submitButton.value = "Save note";

		submitButtonGroup.appendChild(submitButton);
		return submitButtonGroup;
	}

	setViewValues(model) {
		if (model.title !== "" && model.content !== "" && model.color !== "") {
			this.noteTitleGroup.querySelector("#" + this.noteTitleInputID).value =
				model.title;

			this.noteContentGroup.querySelector("#" + this.noteContentInputID).value =
				model.content;

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
		if (model.content === "")
			this.noteContentGroup.lastChild.style.display = "block";
		if (model.color === "")
			this.noteColorSelectorGroup.lastChild.style.display = "block";
	}

	hideFeedback() {
		this.noteTitleGroup.lastChild.style.display = "none";

		this.noteContentGroup.lastChild.style.display = "none";

		this.noteColorSelectorGroup.lastChild.style.display = "none";
	}
}
