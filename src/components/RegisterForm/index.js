import Controller from "../../utils/Controller";
import Model from "./model";
import View from "./view";
import RequestManager from "../../utils/RequestManager";

export default class RegisterForm extends Controller {
	constructor(node) {
		super(node);
		this.model = new Model();
		this.view = new View();
		this._updateModel = this._updateModel.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this._register = this._register.bind(this);
	}

	setListeners() {
		this.view.element.addEventListener("input", this._updateModel);
		this.view.element.addEventListener("submit", this._onSubmit, false);
	}

	removeListeners() {
		this.view.element.removeEventListener("input", this._updateModel);
		this.view.element.removeEventListener("submit", this._onSubmit);
	}

	_updateModel(event) {
		event.preventDefault();
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
		}
	}

	_onSubmit(event) {
		event.preventDefault();
		event.stopPropagation();
		if (this.view.element.checkValidity()) {
			this._register(event);
		}
		this.view.element.classList.add("was-validated");
	}

	_register(event) {
		event.preventDefault();
		this.view.showPleaseWait();
		this.view.removePreviousAlerts();
		RequestManager.postRegisterCredentials(
			this.model.email,
			this.model.password
		).then(response => {
			console.log(response);
			if (response.status !== 200) {
				response.data
					? this.view.showAlert(response.data)
					: this.view.showAlert(response);
			} else {
				this.view.showSuccessAlert();
			}
			this.view.hidePleaseWait();
		});
	}
}
