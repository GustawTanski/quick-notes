import Controller from "../../utils/Controller";
import TopBar from "../TopBar";
import SpinnerButton from "../SpinnerButton";
import Router from "../Router";
export default class App extends Controller {
	constructor(node) {
		super(node);

		this.el = document.createElement("div");

		this.topBar = new TopBar(node);
		this.spinner = new SpinnerButton(node);

		this.router = new Router(node, this.el);
	}
}
