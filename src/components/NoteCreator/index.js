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
	}

	submitFormEventListener(event) {
		event.preventDefault();
		const noteTitle = this.view.element.querySelector(
			"#" + this.view.noteTitleInputID
		);

		const noteMessage = this.view.element.querySelector(
			"#" + this.view.noteMessageInputID
		);

		const newNote = {
			title: noteTitle.value,
			message: noteMessage.value
		};

		//TODO sending new note
	}
}
