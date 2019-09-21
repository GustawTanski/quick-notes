import Controller from "../../utils/Controller";
import NoteContainer from "../NoteContainer";

export default class App extends Controller {
	constructor(node) {
		super(node);
		this.noteContainer = new NoteContainer(node);
	}
}
