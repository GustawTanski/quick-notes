import Controller from "../../utils/Controller";
import Model from "./model";
import View from "./view";
import RequestManager from "../../utils/RequestManager";
import Confirm from "../Confirm";

export default class Note extends Controller {
	constructor(node, config, onDelete) {
		super(node, config);
		this.model = new Model(config);
		this.view = new View(this.model.config);
		this._onCrossButtonClicked = this._onCrossButtonClicked.bind(this);
		this._onDelete = onDelete;
		this.confirm = new Confirm(node, "Are you sure?");
	}

	async _onCrossButtonClicked() {
		const { config } = this.model;
		if (await this.confirm.ask()) {
			const res = await RequestManager.deleteNote(config.noteId);
			console.log(res);
			if (res.status == 200) {
				if (typeof this._onDelete == "function") this._onDelete();
				console.log("Deleted!");
			} else {
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
