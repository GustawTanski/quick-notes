import Controller from "../../utils/Controller";
import View from "./view";
import Model from "./model";
import RequestManager from "../../utils/RequestManager";

export default class NoteCreator extends Controller {
	constructor(node, onCreate) {
		super(node);

		this.model = new Model();
		this.view = new View(this.model);
		this.view.setViewValues(this.model);
		this.onCreate = onCreate;
		this.onSubmitForm = this.onSubmitForm.bind(this);
		this.userSelectedNewColor = this.userSelectedNewColor.bind(this);
		this.onChangeUpdateModel = this.onChangeUpdateModel.bind(this);
		this.onFocusHideFeedback = this.onFocusHideFeedback.bind(this);
		this.onChangeUpdateModel = this.onChangeUpdateModel.bind(this);
		this.onFocusHideFeedback = this.onFocusHideFeedback.bind(this);
		this.onFocusHideFeedback = this.onFocusHideFeedback.bind(this);
		this.onTitleFocusIn = this.onTitleFocusIn.bind(this);
		this.onFormFocusOut = this.onFormFocusOut.bind(this);
	}

	setListeners(event) {
		this.view.element.addEventListener("submit", this.onSubmitForm);

		this.view.element.querySelectorAll("option.btn").forEach(element => {
			element.addEventListener("click", this.userSelectedNewColor);
		});

		this.view.noteTitleInput.addEventListener(
			"change",
			this.onChangeUpdateModel
		);

		this.view.noteTitleInput.addEventListener(
			"focus",
			this.onFocusHideFeedback
		);

		this.view.noteContentInput.addEventListener(
			"change",
			this.onChangeUpdateModel
		);

		this.view.noteContentInput.addEventListener(
			"focus",
			this.onFocusHideFeedback
		);

		this.view.element.addEventListener("focus", this.onFocusHideFeedback);

		this.view.noteTitleInput.addEventListener("focus", this.onTitleFocusIn);

		document.addEventListener("click", this.onFormFocusOut);
	}

	removeListeners() {
		this.view.element.removeEventListener("submit", this.onSubmitForm);

		this.view.element.querySelectorAll("option.btn").forEach(element => {
			element.removeEventListener("click", this.userSelectedNewColor);
		});

		this.view.noteTitleInput.removeEventListener(
			"change",
			this.onChangeUpdateModel
		);

		this.view.noteTitleInput.removeEventListener(
			"focus",
			this.onFocusHideFeedback
		);

		this.view.noteContentInput.removeEventListener(
			"change",
			this.onChangeUpdateModel
		);

		this.view.noteContentInput.removeEventListener(
			"focus",
			this.onFocusHideFeedback
		);

		this.view.element.removeEventListener("focus", this.onFocusHideFeedback);

		this.view.noteTitleInput.removeEventListener("focus", this.onTitleFocusIn);

		document.removeEventListener("click", this.onFormFocusOut);
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
						this.onCreate();
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
