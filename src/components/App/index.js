import Controller from "../../utils/Controller";
import Note from "../Note";

export default class App extends Controller {
	constructor(node) {
		super(node);
		this.note = new Note(node, {
			authorId: "Piesek",
			noteId: "2342131",
			title: "sint excepturi quis",
			color: "blue",
			content:
				"Dolor omnis est fugiat consequatur dolores adipisci. Magnam numquam dolor nisi dolores maxime ut. Veritatis odit repellat dignissimos minus veniam necessitatibus voluptas dolor. Alias at eius hic quas."
		});
	}
}
