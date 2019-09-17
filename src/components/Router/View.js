import View from "../../utils/View";

export default class RouterView extends View {
	constructor(route) {
		super();
		this.element = route;
	}
	changeRoute(newRoute) {
		this.element = newRoute;
	}
}
