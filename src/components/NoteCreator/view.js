import View from "../../utils/View";
import possibleColors from "./possibleColors.json";

export default class NoteCreatorView extends View {
	constructor() {
		super();

		this.element = document.createElement("form");
		this.element.classList.add("container");
		this.element.autocomplete = "off";

		let noteTitleGroup = this._noteTitleDOMCreator();
		let noteBodyGroup = this._noteBodyDOMCreator();
		let noteColorSelectorGroup = this._noteColorSelectorDOMCreator();
		let noteButtonGroup = this._noteSubmitButtonDOMCreator();

		this.children.push(
			noteTitleGroup,
			noteBodyGroup,
			noteColorSelectorGroup,
			noteButtonGroup
		);
	}

	get noteTitleInputID() {
		return "noteCreatorTitleInput";
	}

	get noteMessageInputID() {
		return "noteCreatorMessageInput";
	}

	get noteColorInputID() {
		return "dropdownColorSelector";
	}

	_getColorsFromFile() {
		let stringHTML = "";
		for (let index in possibleColors) {
			const color = possibleColors[index];

			const classList = `bg-${color.colorName} ${color.fontColor} dropdown-item`;

			color.colorName === "light"
				? (classList += ` ${color.fontColor}`)
				: undefined;
			color.colorName === "white"
				? (classList += ` ${color.fontColor}`)
				: undefined;

			const optionString = `<option value=${color.colorName} 
				class="${classList}">${color.colorName}</option>`;

			stringHTML += optionString;
		}

		return stringHTML;
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
		noteBodyLabel.setAttribute("for", this.noteMessageInputID);
		noteBodyLabel.innerText = "Note:";

		let noteBodyTextarea = document.createElement("textarea");
		noteBodyTextarea.classList.add("form-control");
		noteBodyTextarea.setAttribute("id", this.noteMessageInputID);
		noteBodyTextarea.setAttribute("rows", "6");
		noteBodyTextarea.placeholder = "Your note text message...";
		noteBodyTextarea.required = true;
		noteBodyTextarea.name = "message";

		noteBodyGroup.appendChild(noteBodyTextarea);
		noteBodyGroup.insertBefore(noteBodyLabel, noteBodyTextarea);

		return noteBodyGroup;
	}

	_noteSubmitButtonDOMCreator() {
		const buttonText = "Add";

		let noteSubmitButtonGroup = document.createElement("div");
		noteSubmitButtonGroup.classList.add("form-group");

		let submitButton = document.createElement("input");
		submitButton.setAttribute("type", "submit");
		submitButton.classList.add("btn", "btn-success");
		submitButton.value = buttonText;

		noteSubmitButtonGroup.appendChild(submitButton);

		return noteSubmitButtonGroup;
	}

	_noteColorSelectorDOMCreator() {
		const colorSelectorLabel = "Color";

		let colorSelectorGroup = document.createElement("div");
		colorSelectorGroup.classList.add("dropdown");

		const button = `<button 
				class="btn btn-secondary dropdown-toggle" 
				type="button"
				id="${this.noteColorInputID}"
				data-toggle="dropdown">Color
			</button>`;

		const dropdownDiv = document.createElement("div");
		dropdownDiv.setAttribute("aria-labelledby", this.noteColorInputID);
		dropdownDiv.classList.add("dropdown-menu");

		colorSelectorGroup.innerHTML = `${button}`;
		colorSelectorGroup.appendChild(dropdownDiv);
		dropdownDiv.innerHTML = this._getColorsFromFile();

		return colorSelectorGroup;
	}
}
