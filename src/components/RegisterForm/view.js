import View from "../../utils/View";

export default class RegisterFormView extends View {
    constructor() {
        super();

        this.element = document.createElement("form");
        // First Name
        const firstName = document.createElement("div");
        firstName.innerHTML = `
        <div class="form-group">
            <label for="firstNameInput">First Name</label>
            <input id="firstNameInput" placeholder="First Name" type="text" class="form-control"></input>
        </div>`
        // Last Name
        const lastName = document.createElement("div");
        lastName.innerHTML = `
        <div class="form-group">
            <label for="lastNameInput">Last Name</label>
            <input id="lastNameInput" placeholder="Last Name" type="text" class="form-control"></input>
        </div>`
        // E-mail
        const email = document.createElement("div");
        email.innerHTML = `
        <div class="form-group">
            <label for="emailInput">E-mail</label>
            <input id="emailInput" placeholder="E-mail" type="email" class="form-control"></input>
        </div>`
        // Password
        const password = document.createElement("div");
        password.innerHTML = `
        <div class="form-group">
            <label for="passwordInput">Password</label>
            <input id="passwordInput" placeholder="Password" type="password" class="form-control"></input>
        </div>`
        // Confirm password
        const confirmPassword = document.createElement("div");
        confirmPassword.innerHTML = `
        <div class="form-group">
            <label for="confirmPasswordInput">Confirm Password</label>
            <input id="confirmPasswordInput" placeholder="Confirm Password" type="password" class="form-control"></input>
        </div>`
        // Register button
        const registerButton = document.createElement("div");
        registerButton.innerHTML = `
        <button type="submit" class="btn btn-primary">Register</button>`

        this.element.append(
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            registerButton
        );
    }

    setFirstNameInputValue(value) {
        this.firstNameInput.value = value;
    }

    setLastNameInputValue(value) {
        this.lastNameInput.value = value;
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
}