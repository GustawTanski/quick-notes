import View from "../../utils/View";

export default class LoginFormView extends View {
	constructor() {
		super();

		this.element = document.createElement("form");

		const emailGroup = document.createElement("div");
		emailGroup.classList.add("form-group");
		const emailLabel = document.createElement("label");
		emailLabel.setAttribute("for", "emailInput");
		emailLabel.innerText = "Email";
		this.emailInput = document.createElement("input");
		this.emailInput.setAttribute("placeholder", "email");
		this.emailInput.id = "emailInput";
		this.emailInput.classList.add("form-control");

		emailGroup.append(emailLabel, this.emailInput);

		const passwordGroup = document.createElement("div");
		passwordGroup.classList.add("form-group");
		const passwordLabel = document.createElement("label");
		passwordLabel.setAttribute("for", "passwordInput");
		passwordLabel.innerText = "Password";
		this.passwordInput = document.createElement("input");
		this.passwordInput.setAttribute("placeholder", "password");
		this.passwordInput.setAttribute("type", "password");
		this.passwordInput.id = "passwordInput";
		this.passwordInput.classList.add("form-control");

		passwordGroup.append(passwordLabel, this.passwordInput);

		this.submitButton = document.createElement("button");
		this.submitButton.innerText = "Sign in";
		this.submitButton.type = "submit";
		this.submitButton.classList.add("btn", "btn-primary");

		const signUpLinkGroup = document.createElement("div");
		signUpLinkGroup.classList.add("form-group");
		this.signUpLink = document.createElement("small");
		this.signUpLink.innerText = "Don't have an account yet. Sign up here!";
		signUpLinkGroup.append(this.signUpLink);

		this.element.append(
			emailGroup,
			passwordGroup,
			this.submitButton,
			signUpLinkGroup
		);
	}
}
