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
		event.preventDefault();
		if (event.target === this.view.emailInput) {
			this.model.emailValue = event.target.value;
			this.view.setEmailInputValue(this.model.emailValue);
			this.model.isEmailValid = this.view.emailInput.checkValidity();
			this.view.showEmailValidity(this.model.isEmailValid);
		}
		if (event.target === this.view.passwordInput) {
			this.model.passwordValue = event.target.value;
			this.view.setPasswordInputValue(this.model.passwordValue);
			this.model.isPasswordValid = this.view.passwordInput.checkValidity();
			this.view.showPasswordValidity(this.model.isPasswordValid);
		}
	}

	_signIn(event) {
		event.preventDefault();
		if (this.model.isEmailValid && this.model.isPasswordValid) {
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
					window.location.href = "#/notes";
				}
			});
		}
	}
}
