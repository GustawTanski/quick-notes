import Controller from "../../utils/Controller";
import View from "./view";
import Model from "./model";
import { conditionalExpression } from "@babel/types";

/* Warstwa funkcjonalna, backend pod frontem */
export default class NoteCreator extends Controller {
	constructor(node, callback) {
		super(node);

		this.model = new Model();
		this.view = new View();
		window.addEventListener("DOMContentLoaded", this._initListeners.bind(this));

		//only for production use
		window.addEventListener("DOMContentLoaded", () => {
			this.view.element.querySelector("#" + this.view.noteTitleInputID).value =
				"Sample title";
			this.view.element.querySelector(
				"#" + this.view.noteMessageInputID
			).value = "Sample message";
		});
	}

	_initListeners(event) {
		const formElement = this.view.element;

		formElement.addEventListener(
			"submit",
			this.submitFormEventListener.bind(this)
		);

		if (document.readyState !== "loading") {
			const dropdownItemsArray = this.view.element.querySelectorAll(
				"option.dropdown-item"
			);

			dropdownItemsArray.forEach(element => {
				element.addEventListener("click", this.userSelectedNewColor.bind(this));
			});
		}
	}

	submitFormEventListener(event) {
		event.preventDefault();

		let titleQuerySelector = "#" + this.view.noteTitleInputID;
		const noteTitle = this.view.element.querySelector(titleQuerySelector);

		let messageQuerySelector = "#" + this.view.noteMessageInputID;
		const noteMessage = this.view.element.querySelector(messageQuerySelector);

		const noteColor = this.model.color;

		const newNote = {
			title: noteTitle.value,
			message: noteMessage.value,
			color: noteColor
		};

		console.log(newNote);

		//TODO sending new note
	}

	userSelectedNewColor(event) {
		let button = document.querySelector("#" + this.view.noteColorInputID);

		button.classList = event.target.classList;
		button.classList.replace("dropdown-item", "dropdown-toggle");
		button.innerText = event.target.value;

		this.model.color = event.target.value;
	}

	//TODO unmount listeners
}
