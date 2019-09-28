import View from "../../utils/View";

export default class LogOutButtonView extends View {
	constructor() {
		super();
		this.element = document.createElement("a");
		this.element.classList.add("btn", "btn-info", "text-white");
		this.element.href = "#/login";
		this.element.innerText = "Log out";
	}
}
