import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import NoteCreator from "../NoteCreator";
import NoteContainer from "../NoteContainer";
export default class RouterModel {
	constructor(node) {
		this.login = new LoginForm(node);
		this.register = new RegisterForm(node);
		this.noteCreator = new NoteCreator(node);
		this.noteContainer = new NoteContainer(node);
	}
	setURL(newURL) {
		location.href = `/#/${newURL}`;
		history.pushState("", newURL, `/#/${newURL}`);
	}

	handleLoggedState(href) {
		const token = localStorage.getItem("token");
		// debugger;
		if (token) {
			if (href == "login" || href == "register") {
				this.setURL("notes");
				return false;
			}
		} else if (href == "notes") {
			this.setURL("login");
			return false;
		}
		return true;
	}

	manageURL(routes) {
		let href = window.location.href.split("#/")[1];
		if (href == undefined || !(href in routes)) href = "login";
		if (this.handleLoggedState(href)) return href;
		else return;
	}
}
