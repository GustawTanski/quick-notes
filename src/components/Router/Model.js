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
		history.pushState("", newURL, `/#/${newURL}`);
	}
	manageURL() {
		let href = window.location.href.split("#/")[1];
		if (href == undefined) href = "login";
		this.setURL(href);
		return href;
	}
}
