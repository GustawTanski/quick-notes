import Controller from "../../utils/Controller";
import View from "./view";
import Model from "./model";

export default class NoteCreator extends Controller {
	constructor(node, model, callback) {
		super(node);

		this.model = new Model();
		this.view = new View(this.model);
	}

	setListeners(event) {
		this.view.element.addEventListener(
			"submit",
			this.submitFormEventListener.bind(this)
		);

		this.view.element.querySelectorAll("option.btn").forEach(element => {
			element.addEventListener("click", this.userSelectedNewColor.bind(this));
		});

		document
			.querySelector("#" + this.view.noteTitleInputID)
			.addEventListener(
				"change",
				this.onChangeUpdateModelEventListener.bind(this)
			);

		document
			.querySelector("#" + this.view.noteTitleInputID)
			.addEventListener(
				"focus",
				this.hideFeedbackOnFocusEventListener.bind(this)
			);

		document
			.querySelector("#" + this.view.noteMessageInputID)
			.addEventListener(
				"change",
				this.onChangeUpdateModelEventListener.bind(this)
			);

		document
			.querySelector("#" + this.view.noteMessageInputID)
			.addEventListener(
				"focus",
				this.hideFeedbackOnFocusEventListener.bind(this)
			);

		document
			.querySelector("#" + this.view.noteColorInputID)
			.addEventListener(
				"focus",
				this.hideFeedbackOnFocusEventListener.bind(this)
			);
	}

	removeListeners() {
		document
			.querySelector("#" + this.view.noteColorInputID)
			.removeEventListener("focus", this.hideFeedbackOnFocusEventListener);

		document
			.querySelector("#" + this.view.noteMessageInputID)
			.removeEventListener("focus", this.hideFeedbackOnFocusEventListener);

		document
			.querySelector("#" + this.view.noteTitleInputID)
			.removeChild("focus", this.hideFeedbackOnFocusEventListener);

		this.view.element.querySelectorAll("option.btn").forEach(element => {
			element.removeEventListener("click", this.userSelectedNewColor);
		});

		document
			.querySelector("#" + this.view.noteTitleInputID)
			.removeEventListener("change", this.onChangeUpdateModelEventListener);

		document
			.querySelector("#" + this.view.noteMessageInputID)
			.removeEventListener("change", this.onChangeUpdateModelEventListener);

		this.view.element.removeEventListener(
			"submit",
			this.submitFormEventListener
		);
	}

	hideFeedbackOnFocusEventListener(event) {
		event.target.parentElement.lastChild.style.display = "none";
	}

	dropDownActiveEventListener(event) {
		if (event.target.previousSibling.classList.contains("show")) {
			event.target.previousSibling.style.display = "flex";
		} else {
			event.target.previousSibling.style.display = "none";
		}
	}

	onChangeUpdateModelEventListener(event) {
		event.stopPropagation();
		event.preventDefault();
		const text = event.target.value;
		this.model[`${event.target.name}`] = text;
	}

	submitFormEventListener(event) {
		event.preventDefault();
		this.view.hideFeedback();

		let validation = this.model.validate();

		if (validation) {
			// TODO send note
		} else {
			this.view.showFeedback(this.model);
		}
	}

	userSelectedNewColor(event) {
		let button = this.view.noteColorSelectorGroup.querySelector(
			".dropdown-toggle"
		);

		button.style.backgroundColor = event.target.style.backgroundColor;
		button.style.color = event.target.style.color;

		this.model.color = event.target.value;
	}
}
