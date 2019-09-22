import $ from "jquery";

import Controller from "../../utils/Controller";
import Model from "./model";
import View from "./view";

export default class Confirm extends Controller {
	constructor(node, message) {
		super(node);
		this.model = new Model(message);
		this.view = new View(this.model.message);
	}

	async ask() {
		$(this.view.modal).modal("show");
		return await new Promise((resolve, reject) => {
			this.view.buttonYes.addEventListener(
				"click",
				function confirm() {
					resolve(true);
					this.view.buttonYes.removeEventListener("click", confirm);
					$(this.view.modal).modal("hide");
				}.bind(this)
			);
			this.view.buttonNo.addEventListener(
				"click",
				function deny() {
					resolve(false);
					this.view.buttonNo.removeEventListener("click", deny());
					$(this.view.modal).modal("hide");
				}.bind(this)
			);
		});
	}
}
