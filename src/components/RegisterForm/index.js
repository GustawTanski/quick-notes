import Controller from "../../utils/Controller";
import Model from "./model";
import View from "./view";
//import RequestManager from "../../utils/RequestManager";

export default class RegisterForm extends Controller {
	constructor(node) {
		super(node);
		this.model = new Model();
		this.view = new View();
	}

	setListeners() {
		this.view.element.addEventListener("input", event =>
			this._updateModel(event)
		);

		/*this.view.element.addEventListener("submit", event =>
			this._register(event)
		);*/
	}

	_updateModel(event) {
		if (event.target === this.view.emailInput) {
			this.model.email = event.target.value;
			this.view.setEmailInputValue(this.model.email);
		}
		if (event.target === this.view.passwordInput) {
			this.model.password = event.target.value;
			this.view.setPasswordInputValue(this.model.password);
		}
		if (event.target === this.view.confirmPasswordInput) {
			this.model.confirmPassword = event.target.value;
			this.view.setConfirmPasswordInputValue(this.model.confirmPassword);
			this.view.passwordMatching();
		}
	}
	/*
		_register(event) {
			event.preventDefault();
			if (!this.model.email || !this.model.password) {
				console.log("Please enter email and password.");
			} else {
				RequestManager.postRegisterCredentials(
					this.model.email,
					this.model.password
				).then(response => console.log(response));
			}
		}*/
}
