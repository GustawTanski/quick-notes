import Controller from "../../utils/Controller";
import Model from "./model";
import View from "./view";

export default class Note extends Controller {
	constructor(node, config) {
		super(node, config);
		this.model = new Model(config);
		this.view = new View(this.model.config);
	}
}
