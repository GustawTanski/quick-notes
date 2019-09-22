import View from "../../utils/View";

export default class LoginFormView extends View {
	constructor() {
		super();

		this.element = document.createElement("form");
		this.element.className =
			"register-form mx-auto col-12 text-center mt-5 border rounded px-2 px-sm-5 py-4 bg-light";
		this.element.style.width = "576px";
		this.element.setAttribute("novalidate", "");

		const header = document.createElement("div");
		header.innerHTML = `
		<h3 class="header mb-4 text-center">LOGIN</h3>`;

		const emailGroup = document.createElement("div");
		emailGroup.className = "mb-3";
		emailGroup.innerHTML = `
		<label for="emailInput" >Email</label>
		<input placeholder='email' type ="email" maxlength="255" required id="emailInput" class="form-control text-center">
		<div class="invalid-feedback">Please provide a valid email.</div>`;
		this.emailInput = emailGroup.querySelector(".form-control");

		const passwordGroup = document.createElement("div");
		passwordGroup.className = "mb-3";
		passwordGroup.innerHTML = `
		<label for="passwordInput">Password</label>
		<input placeholder='password' type ="password" pattern=".{5,}" required  maxlength="255" id="passwordInput" class="form-control text-center">
		<div class="invalid-feedback">Password must be at least 5 characters long.</div>`;
		this.passwordInput = passwordGroup.querySelector(".form-control");

		const submitGroup = document.createElement("div");
		submitGroup.innerHTML = `
		<button type='submit' class="btn btn-primary btn-block mb-2">Sign in</button>`;
		this.submitButton = submitGroup.querySelector(".btn");

		const signUpLinkGroup = document.createElement("div");
		signUpLinkGroup.innerHTML = `
		<p class="mb-2">Don't have an account yet?<a href="#/register"> Sign up here!</a></p>`;

		const forgotLinkGroup = document.createElement("div");
		forgotLinkGroup.innerHTML = `
		<p class="mb-3">Can't remeber password?<a href="http://quick-notes-253112.appspot.com/forgot"> Reset it here!</a></p>`;

		this.element.append(
			header,
			emailGroup,
			passwordGroup,
			submitGroup,
			signUpLinkGroup,
			forgotLinkGroup
		);
	}

	setEmailInputValue(value) {
		this.emailInput.value = value;
	}

	setPasswordInputValue(value) {
		this.passwordInput.value = value;
	}

	showEmailValidity(isValid) {
		if (isValid) {
			if (this.emailInput.classList.contains("is-invalid")) {
				this.emailInput.classList.remove("is-invalid");
			}
			this.emailInput.classList.add("is-valid");
		} else {
			this.emailInput.classList.add("is-invalid");
		}
	}

	showPasswordValidity(isValid) {
		if (isValid) {
			if (this.passwordInput.classList.contains("is-invalid")) {
				this.passwordInput.classList.remove("is-invalid");
			}
			this.passwordInput.classList.add("is-valid");
		} else {
			this.passwordInput.classList.add("is-invalid");
		}
	}

	showPleaseWait() {
		this.submitButton.innerText = "Please wait...";
	}

	hidePleaseWait() {
		this.submitButton.innerText = "Sign in";
	}

	showAlert(message) {
		const alert = document.createElement("div");
		alert.className = "alert alert-danger alert-dismissible fade show mt-3";
		alert.role = "alert";
		alert.innerHTML = `${message}
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		  <span aria-hidden="true">&times;</span>
		</button>`;
		this.element.append(alert);
	}
}
