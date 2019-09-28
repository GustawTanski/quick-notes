import Controller from "../../utils/Controller";
import View from "./view";
import RequestManager from "../../utils/RequestManager";

export default class LogOutButton extends Controller {
	constructor(node) {
		super(node);
		this.view = new View();
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		RequestManager.logout();
	}

	setListeners() {
		this.view.element.addEventListener("click", this.onClick);
	}

	removeListeners() {
		this.view.element.removeEventListener("click", this.onClick);
	}
}
