import Controller from "../../utils/Controller";
import TopBar from "../TopBar";
import SpinnerButton from "../SpinnerButton";
import NoteCreator from "../NoteCreator/index";

export default class App extends Controller {
	constructor(node) {
		super(node);
		this.topBar = new TopBar(node);
		this.spinner = new SpinnerButton(node);
		this.note = new NoteCreator(node);
	}
}
