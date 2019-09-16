import View from "../../utils/View";

export default class LoginFormView extends View {
	constructor() {
		super();

		this.element = document.createElement("form");

		const emailGroup = document.createElement("div");
		emailGroup.innerHTML = `
		<label for="emailInput">Email</label>
		<input placeholder='email' type ="email" id="emailInput" class="form-control">`;
		this.emailInput = emailGroup.querySelector(".form-control");

		const passwordGroup = document.createElement("div");
		passwordGroup.innerHTML = `
		<label for="passwordInput">Password</label>
		<input placeholder='password' type ="password" id="passwordInput" class="form-control">`;
		this.passwordInput = passwordGroup.querySelector(".form-control");

		const submitGroup = document.createElement("div");
		submitGroup.innerHTML = `
		<button type='submit' class="btn btn-primary">Sign in</button>`;

		const signUpLinkGroup = document.createElement("div");
		signUpLinkGroup.innerHTML = `
		<small>Don't have an account yet? Sign up here!</small>`;
		this.signUpLink = signUpLinkGroup.querySelector("small");

		this.element.append(
			emailGroup,
			passwordGroup,
			submitGroup,
			signUpLinkGroup
		);
	}

	setEmailInputValue(value) {
		this.emailInput.value = value;
	}

	setPasswordInputValue(value) {
		this.passwordInput.value = value;
	}
}
