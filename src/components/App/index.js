import Controller from "../../utils/Controller";
import Note from "../Note";

export default class App extends Controller {
	constructor(node) {
		super(node);
		this.note = new Note(node, {
			color: "red",
			title: "blue",
			content: "sersfs"
		});
	}
}
