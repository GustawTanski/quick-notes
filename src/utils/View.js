export default class View {
	constructor() {
		this.children = [];
	}
	render() {
		this.children.forEach(child => this.element.appendChild(child));
		return this.element;
	}
}
