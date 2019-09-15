import Controller from "../../utils/Controller";
import Model from "./model";
import View from "./view";

export default class LoginForm extends Controller {
	constructor(node) {
		super(node);
		this.model = new Model();
		this.view = new View();
	}

	setListeners() {
		this.view.element.addEventListener("submit", event => {
			event.preventDefault();

			if (!this.view.emailInput.value || !this.view.passwordInput.value) {
				console.log("please enter email and password");
			} else {
				console.log("email", this.view.emailInput.value);
				console.log("password", this.view.passwordInput.value);
			}
		});

		this.view.signUpLink.addEventListener("click", event => {
			console.log("redirecting to sign up page");
		});
	}
}
