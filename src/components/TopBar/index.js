import Controller from "../../utils/Controller";
import Model from "./model";
import View from "./view";

export default class TopBar extends Controller {
	constructor(node) {
		super(node);
		this.model = new Model(["Home", "Log in", "Register", "About"]);
		this.view = new View(this.model.links);
	}

	setListeners() {
		this.view.element.addEventListener("click", event => {
			this.view.links.forEach(link => {
				if (link == event.target) link.classList.add("active");
				else link.classList.remove("active");
			});
		});
	}
}
