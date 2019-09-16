import Controller from "../../utils/Controller";
import View from "./view";
import Model from "./model";

/* Warstwa funkcjonalna, backend pod frontem */
export default class NoteCreator extends Controller {
	constructor(node) {
		super(node);

		this.model = new Model();
		this.view = new View();
	}
}
