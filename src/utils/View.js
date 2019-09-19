export default class View {
	constructor() {
		this.children = [];
		this._rendered = false;
	}

	set children(children) {
		if (
			children instanceof Array &&
			children.every(child => child instanceof HTMLElement)
		)
			this._children = children;
		else throw TypeError("Wrong children type. Should be Array<HTMLElement>");
	}

	get children() {
		return this._children;
	}

	render() {
		if (!this._rendered) {
			this.children.forEach(child => this.element.appendChild(child));
			this._rendered = true;
		}
		return this.element;
	}
}
