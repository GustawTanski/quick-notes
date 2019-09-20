import Controller from "../../utils/Controller";
import TopBar from "../TopBar";
import SpinnerButton from "../SpinnerButton";

export default class App extends Controller {
	constructor(node) {
		super(node);
		this.note = new Note(node, {
			color: "red",
			title: "blue",
			content: "sersfs"
		});
		this.topBar = new TopBar(node);
		this.spinner = new SpinnerButton(node);
		this.note = new NoteCreator(node);
	}
}
