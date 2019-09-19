import Controller from "../../utils/Controller";
import Model from "./Model";

export default class Router extends Controller {
	constructor(node) {
		super(node);
		this.model = new Model();
		this.hrefHandler = this.hrefHandler.bind(this);
		this.login = new LoginForm(node);
		this.register = new RegisterForm(node);
		this.noteCreator = new NoteCreator(node);
		this.routes = {
			login: this.login,
			register: this.register,
			noteCreator: this.noteCreator
		};
		this.currentRoute = null;
		this.hrefHandler();
	}
	onRouteChange(route) {
		if (typeof route != "string") {
			return console.log("This parameter should be string.");
		}
		let newRoute = this.routes[route];
		let isSameRoute = this.isSameRoute(newRoute);
		if (this.currentRoute != null && !isSameRoute) this.currentRoute.unmount();
		this.mountComponent(newRoute, isSameRoute);
	}
	mountComponent(newRoute, isSameRoute) {
		if (!isSameRoute) {
			this.currentRoute = newRoute;
			this.currentRoute.mount();
		}
	}
	isSameRoute(toCheck) {
		if (this.currentRoute == toCheck) return true;
		else return false;
	}
	setListeners() {
		window.addEventListener("hashchange", this.hrefHandler);
	}
	hrefHandler() {
		let href = this.model.manageURL();
		this.onRouteChange(href);
	}
}
