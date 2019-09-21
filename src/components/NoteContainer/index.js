import Controller from "../../utils/Controller";
import View from "./view";
import Model from "./model";
// import Note from "../Note";
// import NoteCreator from "../NoteCreator";

export default class NoteContainer extends Controller {
	constructor(node) {
		super(node);
		this.model = new Model();
		this.view = new View();
		// this.noteCreator = new NoteCreator(node, this.createNote);
	}
}
