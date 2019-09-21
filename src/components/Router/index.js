import Controller from "../../utils/Controller";
import Model from "./Model";
export default class Router extends Controller {
	constructor(node) {
		super(node);
		this.model = new Model(node);
		this.hrefHandler = this.hrefHandler.bind(this);
		this.routes = {
			login: this.model.login,
			register: this.model.register,
			creator: this.model.noteCreator,
			notes: this.model.noteContainer
		};
		this.currentRoute = null;
		this.hrefHandler();
	}
	onRouteChange(route) {
		if (typeof route != "string") {
			return console.log("This parameter should be string.");
		}
		let newRoute = this.routes[route];
		if (newRoute == undefined) newRoute = this.routes.login;
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
