import Controller from "../../utils/Controller";
import TopBar from "../TopBar";
import SpinnerButton from "../SpinnerButton";
import Router from "../Router";
import Note from "../Note";
import NoteCreator from "../NoteCreator/index";

export default class App extends Controller {
	constructor(node) {
		super(node);
		this.topBar = new TopBar(node);
		this.spinner = new SpinnerButton(node);
		// this.router = new Router(node);
		this.noteCreator = new NoteCreator(node);
	}
}
