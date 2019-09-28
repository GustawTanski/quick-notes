import View from "../../utils/View";
import Note from "../Note";
import Macy from "macy";
export default class NoteContainerView extends View {
	constructor() {
		super();
		this.element = document.createElement("div");
		this.element.innerHTML = `<div class="noteCreator"></div>
    <div class="macy"></div>`;
		this.noteCreatorContainer = this.element.querySelector(".noteCreator");
		this.macyContainer = this.element.querySelector(".macy");

		this.macyContainer.style.width = "90%";
		this.macyContainer.style.margin = "auto";
		this.macyContainer.style.marginTop = "50px";
		const masonry = new Macy({
			container: this.macyContainer,
			columns: 6,
			margin: { x: 10, y: 20 },
			breakAt: {
				1200: 5,
				940: 3,
				520: 2,
				400: 1
			}
		});
	}

	render() {
		if (!this._rendered) {
			this.children.forEach(child => this.macyContainer.appendChild(child));
			this._rendered = true;
		}
		return this.element;
	}
}
