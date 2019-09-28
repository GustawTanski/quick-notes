import View from "../../utils/View";
import Macy from "macy";
import "./noteContainer.css";

export default class NoteContainerView extends View {
	constructor() {
		super();
		this.element = document.createElement("div");
		this.element.innerHTML = `
			<div class="logOutContainer"></div>
			<div class="noteCreator"></div>
			<div class="macy"></div>
		`;
		this.noteCreatorContainer = this.element.querySelector(".noteCreator");
		this.logOutContainer = this.element.querySelector(".logOutContainer");
		this.macyContainer = this.element.querySelector(".macy");

		this.masonry = new Macy({
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
