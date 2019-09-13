import Controller from "../../bases/Controller";
import View from "./view";
import Model from "./model";

export default class SpinnerButton extends Controller {
	constructor(node, isLoading = false) {
		super(node);
		this.model = new Model(isLoading);
		this.view = new View(this.model.isLoading);
	}

	setListeners() {
		this.view.element.addEventListener("click", () => {
			if (!this.model.isLoading) {
				this.model.isLoading = true;
				this.view.setLoadingForTime(3).then(() => (this.model.isLoading = false));
			}
		});
	}
}
