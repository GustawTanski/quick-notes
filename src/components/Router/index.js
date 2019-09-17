import Controller from "../../utils/Controller";
import View from "./View";
import Model from "./Model";

export default class Router extends Controller {
	constructor(node, route) {
		super(node);
		this.model = new Model();
		this.view = new View(route);
		this.hrefHandler = this.hrefHandler.bind(this);

		this.login = new LoginForm(node);
		this.register = new RegisterForm(node);
		this.noteCreator = new NoteCreator(node);

		this.routes = {
			login: "thislogin",
			register: "this.register",
			noteCreator: "this.noteCreator"
		};
		this.hrefHandler();
	}
	onRouteChange(newRoute) {
		if (typeof newRoute != "string") {
			return console.log("Podaj poprawny route (jako string).");
		}
		let route = this.routes[newRoute].view.element;
		this.view.changeRoute(route);
	}
	setListeners() {
		window.addEventListener("hashchange", this.hrefHandler);
	}
	hrefHandler() {
		let href = this.model.manageURL();
		this.onRouteChange(href);
	}
}
