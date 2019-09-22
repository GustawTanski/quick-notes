import Controller from "../../utils/Controller";
import Model from "./model";
import View from "./view";
import RequestManager from "../../utils/RequestManager";

export default class LoginForm extends Controller {
	constructor(node) {
		super(node);
		this.model = new Model();
		this.view = new View();
		this._updateModel = this._updateModel.bind(this);
		this._signIn = this._signIn.bind(this);
	}

	setListeners() {
		this.view.element.addEventListener("input", this._updateModel);
		this.view.element.addEventListener("submit", this._signIn);
	}

	removeListeners() {
		this.view.element.removeEventListener("input", this._updateModel);
		this.view.element.removeEventListener("submit", this._signIn);
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
		// console.log(this.model);
	}

	_signIn(event) {
		event.preventDefault();
		if (!this.model.emailValue || !this.model.passwordValue) {
			console.log("please enter email and password");
		} else {
			console.log(
				`logging in with email ${this.model.emailValue} and password ${this.model.passwordValue}`
			);

			RequestManager.postLoginCredentials(
				this.model.emailValue,
				this.model.passwordValue
			).then(response => {
				console.log(response);

				if (response.status !== 200) {
					response.data
						? this.view.showAlert(response.data)
						: this.view.showAlert(response);
				} else {
					window.location.href = `${RequestManager.requester.defaults.baseURL}/notes`;
				}
			});
		}
	}
}