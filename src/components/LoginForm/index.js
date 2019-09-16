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
		this.view.element.addEventListener("change", event =>
			this._updateModel(event)
		);

		this.view.element.addEventListener("submit", event => this._signIn(event));

		this.view.signUpLink.addEventListener("click", event =>
			this._redirectToSignUpPage()
		);
	}

	_updateModel(event) {
		if (event.target === this.view.emailInput) {
			this.model.emailValue = event.target.value;
			this.view.setEmailInputValue(this.model.emailValue);
		}
		if (event.target === this.view.passwordInput) {
			this.model.passwordValue = event.target.value;
			this.view.setPasswordInputValue(this.model.passwordValue);
		}
		console.log(this.model);
	}

	_signIn(event) {
		event.preventDefault();
		if (!this.model.emailValue || !this.model.passwordValue) {
			console.log("please enter email and password");
		} else {
			console.log(
				`logging in with email ${this.model.emailValue} and password ${this.model.passwordValue}`
			);
		}
	}

	_redirectToSignUpPage() {
		console.log("redirecting to sign up page");
	}
}
