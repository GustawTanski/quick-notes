import Controller from "../../utils/Controller";
import Router from "../Router";

export default class App extends Controller {
	constructor(node) {
		super(node);
		this.router = new Router(node);
	}
}
