import Controller from "../../utils/Controller";
import View from "./view";
import Model from "./model";
import RequestManager from "../../utils/RequestManager";

export default class NoteCreator extends Controller {
	constructor(node, model) {
		super(node);

		this.model = new Model(model);
		this.view = new View(this.model);

		this.view.setViewValues(this.model);
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
			.querySelector("#" + this.view.formID)
			.addEventListener(
				"focus",
				this.hideFeedbackOnFocusEventListener.bind(this)
			);

		document
			.querySelector("#" + this.view.noteTitleInputID)
			.addEventListener("focus", this.onTitleFocusIn.bind(this));

		document.addEventListener("click", this.onFormFocusOut.bind(this));
	}

	removeListeners() {
		document.removeEventListener("click", this.onFormFocusOut);

		document
			.querySelector("#" + this.view.noteTitleInputID)
			.removeEventListener("focus", this.onTitleFocusIn);

		document
			.querySelector("#" + this.view.formID)
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
			RequestManager.postNote(
				this.model.color,
				this.model.message,
				this.model.title
			)
				.then(result => {
					this.view.postNotePostingFeedback(true, "Succesfully added note!");
				})
				.catch(error => {
					this.view.postNotePostingFeedback(false, error);
				});
			document.focus;
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

	onTitleFocusIn(event) {
		this.view.dropdownDiv.style.maxHeight = `${this.view.dropdownDiv.scrollHeight}px`;
		setTimeout(() => {
			this.view.dropdownDiv.style.overflow = "unset";
			this.view.dropdownDiv.style.maxHeight = "fit-content";
		}, 350);
	}
	onFormFocusOut(event) {
		if (!event.path.some(element => element == this.view.element)) {
			this.view.dropdownDiv.style.maxHeight = `${this.view.noteTitleGroup
				.scrollHeight + 10}px`;
			this.view.dropdownDiv.style.overflow = "hidden";
		}
	}
}
