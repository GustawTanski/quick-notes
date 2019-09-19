import View from "../../utils/View";

export default class RegisterFormView extends View {
	constructor() {
		super();

		this.element = document.createElement("form");
		this.element.className =
			"mx-auto col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4";
		// Email
		const email = document.createElement("div");
		email.innerHTML = `
        <div class="form-group">
            <label for="emailInput">Email</label>
			<input id="emailInput" placeholder="Email" type="email" class="form-control"></input>
		</div>`;
		this.emailInput = email.querySelector("#emailInput");
		// Password
		const password = document.createElement("div");
		password.innerHTML = `
        <div class="form-group">
            <label for="passwordInput">Password</label>
            <input id="passwordInput" placeholder="Password" type="password" pattern=".{5,}" class="form-control"></input>
            <small class="form-text text-muted">
                Password must be at least 5 characters long.
            </small>
        </div>`;
		this.passwordInput = password.querySelector(".form-control");
		// Confirm password
		const confirmPassword = document.createElement("div");
		confirmPassword.innerHTML = `
        <div class="form-group">
            <label for="confirmPasswordInput">Confirm Password</label>
			<input id="confirmPasswordInput" placeholder="Confirm Password" type="password" pattern=".{5,}" class="form-control"></input>
			<div class="invalid-feedback">
          		Passwords do not match.
			</div>
			<small class="notMatching"></small>
        </div>`;
		this.confirmPasswordInput = confirmPassword.querySelector(".form-control");
		// Register button
		const registerButton = document.createElement("div");
		registerButton.innerHTML = `
		<button type="submit" class="btn btn-primary mb-2">Register</button>`;
		// Redirect to login
		const alreadyRegistered = document.createElement("div");
		alreadyRegistered.innerHTML = `
            <p>
                Already registered?
                <a href="/">Log in</a>
            </p>`;

		this.element.append(
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

	passwordMatching() {
		if (
			document.getElementById("passwordInput").value ==
			document.getElementById("confirmPasswordInput").value
		) {
			//
		} else {
		}
	}
}
