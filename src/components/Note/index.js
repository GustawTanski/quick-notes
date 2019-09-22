import Controller from "../../utils/Controller";
import Model from "./model";
import View from "./view";
import RequestManager from "../../utils/RequestManager";

export default class Note extends Controller {
	constructor(node, config, onDelete) {
		super(node, config);
		this.model = new Model(config);
		this.view = new View(this.model.config);
		this._onCrossButtonClicked = this._onCrossButtonClicked.bind(this);
		this._onDelete = onDelete;
	}

	async _onCrossButtonClicked() {
		const { config } = this.model;
		console.log(config);
		if (confirm("Are you sure?")) {
			try {
				const res = await RequestManager.deleteNote(
					config.authorId,
					config.noteId
				);
				if (typeof this._onDelete == "function") this._onDelete();
				console.log("Deleted!");
			} catch (error) {
				alert("Something went wrong! Try again.");
			}
		}
	}

	setListeners() {
		this.view.crossButton.addEventListener("click", this._onCrossButtonClicked);
	}

	removeListeners() {
		this.view.crossButton.removeEventListener(
			"click",
			this._onCrossButtonClicked
		);
	}
}
