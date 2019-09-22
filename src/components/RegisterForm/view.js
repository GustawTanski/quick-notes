import View from "../../utils/View";
import "./style.css";

export default class RegisterFormView extends View {
	constructor() {
		super();

		this.element = document.createElement("form");
		this.element.className =
			"register-form mx-auto col-12 text-center mt-5 border rounded px-2 px-sm-5 py-4 bg-light";
		this.element.setAttribute("novalidate", "");
		this.element.setAttribute(
			"oninput",
			'confirmPasswordInput.setCustomValidity(confirmPasswordInput.value != passwordInput.value ? "Passwords do not match." : "")'
		);
		// Header
		const header = document.createElement("div");
		header.innerHTML = `
		<h3 class="header mb-4 text-center">CREATE ACCOUNT</h3>`;
		// Email
		const email = document.createElement("div");
		email.innerHTML = `
        <div class="form-group mb-3">
            <label for="emailInput">Email</label>
			<input id="emailInput" placeholder="kontakt@coderscrew.pl" type="email" max-length="255" required class="form-control text-center"></input>
			<div class="invalid-feedback">
          		Please enter a valid email address.
			</div>
		</div>`;
		this.emailInput = email.querySelector("#emailInput");
		// Password
		const password = document.createElement("div");
		password.innerHTML = `
        <div class="form-group mb-3">
            <label for="passwordInput">Password</label>
            <input id="passwordInput" name="passwordInput" type="password" pattern=".{5,}" maxlength="255" required class="form-control text-center"></input>
            <small class="form-text text-muted">
                Password must be at least 5 characters long.
			</small>
			<div class="invalid-feedback">
          		Password must be at least 5 characters long.
			</div>
		</div>`;
		this.passwordInput = password.querySelector("#passwordInput");
		this.smallText = password.querySelector("small");
		// Confirm password
		const confirmPassword = document.createElement("div");
		confirmPassword.innerHTML = `
        <div class="form-group mb-3">
            <label for="confirmPasswordInput">Confirm Password</label>
			<input id="confirmPasswordInput" name="confirmPasswordInput" type="password" required class="form-control text-center"></input>
			<div class="invalid-feedback">
          		Passwords do not match.
			</div>
			<small class="notMatching"></small>
        </div>`;
		this.confirmPasswordInput = confirmPassword.querySelector(
			"#confirmPasswordInput"
		);
		// Register button
		const registerButton = document.createElement("div");
		registerButton.innerHTML = `
		<button type="submit" class="btn btn-primary btn-block mb-2">Register</button>`;
		this.button = registerButton.querySelector("button");
		// Redirect to login
		const alreadyRegistered = document.createElement("div");
		alreadyRegistered.innerHTML = `
            <p class="mb-0">
                Already registered?
                <a href="#">Log in</a>
			</p>`;
		this.loginLink = alreadyRegistered.querySelector("a");

		this.element.append(
			header,
			email,
			password,
			confirmPassword,
			registerButton,
			alreadyRegistered
		);
	}

	setEmailInputValue(value) {
		this.emailInput.value = value;
	}

	setPasswordInputValue(value) {
		this.passwordInput.value = value;
	}

	setConfirmPasswordInputValue(value) {
		this.confirmPasswordInput.value = value;
	}

	showPleaseWait() {
		this.button.innerText = "Please wait...";
	}

	hidePleaseWait() {
		this.button.innerText = "Register";
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

	showSuccessAlert() {
		const alert = document.createElement("div");
		alert.className = "alert alert-success alert-dismissible fade show mt-3";
		alert.role = "alert";
		alert.innerHTML = `
		<h4>You've been successfully registered!</h4>
		<p>Check your email and verify your account.</p>
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		  <span aria-hidden="true">&times;</span>
		</button>`;
		this.element.append(alert);
	}
}
