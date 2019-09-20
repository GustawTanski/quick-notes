import View from "../../utils/View";

export default class LoginFormView extends View {
	constructor() {
		super();

		this.element = document.createElement("form");
		this.element.className =
			"mx-auto col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 text-center mt-5";

		const emailGroup = document.createElement("div");
		emailGroup.innerHTML = `
		<label for="emailInput">Email</label>
		<input placeholder='email' type ="email" maxlength="255" required id="emailInput" class="form-control text-center">`;
		this.emailInput = emailGroup.querySelector(".form-control");

		const passwordGroup = document.createElement("div");
		passwordGroup.innerHTML = `
		<label for="passwordInput">Password</label>
		<input placeholder='password' type ="password" pattern=".{5,}" required title="5 characters minimum" maxlength="255" id="passwordInput" class="form-control text-center">`;
		this.passwordInput = passwordGroup.querySelector(".form-control");

		const submitGroup = document.createElement("div");
		submitGroup.innerHTML = `
		<button type='submit' class="btn btn-primary btn-block">Sign in</button>`;

		const signUpLinkGroup = document.createElement("div");
		signUpLinkGroup.innerHTML = `
		<small>Don't have an account yet?<a href="#"> Sign up here!</a></small>`;
		this.signUpLink = signUpLinkGroup.querySelector("a");

		const forgotLinkGroup = document.createElement("div");
		forgotLinkGroup.innerHTML = `
		<small>Can't remeber password?<a href="#"> Reset it here!</a></small>`;
		this.forgotLink = forgotLinkGroup.querySelector("a");

		this.element.append(
			emailGroup,
			passwordGroup,
			submitGroup,
			signUpLinkGroup,
			forgotLinkGroup
		);

		Array.from(this.element.children).forEach(child =>
			child.classList.add("mb-3")
		);
	}

	setEmailInputValue(value) {
		this.emailInput.value = value;
	}

	setPasswordInputValue(value) {
		this.passwordInput.value = value;
	}

	showAlert(message) {
		const alert = document.createElement("div");
		alert.className = "alert alert-danger alert-dismissible fade show";
		alert.role = "alert";
		alert.innerHTML = `${message}
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		  <span aria-hidden="true">&times;</span>
		</button>`;
		this.element.append(alert);
	}
}
