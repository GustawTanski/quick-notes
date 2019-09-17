import Controller from "../../utils/Controller";
import View from "./view";
import Model from "./model";
import { conditionalExpression } from "@babel/types";

/* Warstwa funkcjonalna, backend pod frontem */
export default class NoteCreator extends Controller {
	constructor(node) {
		super(node);

		this.model = new Model();
		this.view = new View();
		window.addEventListener("DOMContentLoaded", this._initListeners.bind(this));
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
			"#" + this.view.noteTextareaID
		);

		console.log("Title:", noteTitle.value);
		console.log("Message:", noteMessage.value);
	}

	_checkEmptyValues(domElement) {
		let value = domElement.value;

		if (!value && typeof value === "string") {
			let initialCase =
				domElement.name.charAt(0).toUpperCase() + domElement.name.slice(1);

			alert(`${initialCase} must not be empty`);

			return false;
		}
		return true;
	}
}
