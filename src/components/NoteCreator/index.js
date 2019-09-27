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
		this.view.element.addEventListener("submit", this.onSubmitForm.bind(this));

		this.view.element.querySelectorAll("option.btn").forEach(element => {
			element.addEventListener("click", this.userSelectedNewColor.bind(this));
		});

		document
			.querySelector("#" + this.view.noteTitleInputID)
			.addEventListener("change", this.onChangeUpdateModel.bind(this));

		document
			.querySelector("#" + this.view.noteTitleInputID)
			.addEventListener("focus", this.onFocusHideFeedback.bind(this));

		document
			.querySelector("#" + this.view.noteContentInputID)
			.addEventListener("change", this.onChangeUpdateModel.bind(this));

		document
			.querySelector("#" + this.view.noteContentInputID)
			.addEventListener("focus", this.onFocusHideFeedback.bind(this));

		document
			.querySelector("#" + this.view.formID)
			.addEventListener("focus", this.onFocusHideFeedback.bind(this));

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
			.removeEventListener("focus", this.onFocusHideFeedback);

		document
			.querySelector("#" + this.view.noteContentInputID)
			.removeEventListener("focus", this.onFocusHideFeedback);

		document
			.querySelector("#" + this.view.noteTitleInputID)
			.removeChild("focus", this.onFocusHideFeedback);

		this.view.element.querySelectorAll("option.btn").forEach(element => {
			element.removeEventListener("click", this.userSelectedNewColor);
		});

		document
			.querySelector("#" + this.view.noteTitleInputID)
			.removeEventListener("change", this.onChangeUpdateModel);

		document
			.querySelector("#" + this.view.noteContentInputID)
			.removeEventListener("change", this.onChangeUpdateModel);

		this.view.element.removeEventListener("submit", this.onSubmitForm);
	}

	onFocusHideFeedback(event) {
		event.target.parentElement.lastChild.style.display = "none";
	}

	onChangeUpdateModel(event) {
		event.stopPropagation();
		event.preventDefault();
		const text = event.target.value;
		this.model[`${event.target.name}`] = text;
	}

	onSubmitForm(event) {
		event.preventDefault();
		this.view.hideFeedback();

		let validation = this.model.validate();

		if (validation) {
			RequestManager.postNote(
				this.model.color,
				this.model.content,
				this.model.title
			)
				.then(result => {
					if (result.status === 200) {
						this.view.notePostingResultDiv(true, "Succesfully added note!");
					} else {
						this.view.notePostingResultDiv(false, result.data);
					}
				})
				.catch(error => {
					this.view.notePostingResultDiv(false, error);
				});
		} else {
			this.view.showFeedback(this.model);
		}
	}

	userSelectedNewColor(event) {
		let dropdownButton = this.view.noteColorSelectorGroup.querySelector(
			".dropdown-toggle"
		);

		dropdownButton.style.backgroundColor = event.target.style.backgroundColor;
		dropdownButton.style.color = event.target.style.color;

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
			this.view.dropdownDiv.style.overflow = "hidden";
			this.view.dropdownDiv.style.maxHeight = `${this.view.noteTitleGroup
				.scrollHeight + 10}px`;
		}
	}
}
