import View from "./View";

export default class Controller {
	constructor(node) {
		this.node = node;
	}

	set node(node) {
		if (node instanceof Node) this._node = node;
		else throw TypeError("Wrong node parameter. Should be a Node.");
	}

	get node() {
		return this._node;
	}

	setListeners() {}

	removeListeners() {}

	mount() {
		this.flatMount();
		for (const i in this) {
			if (this[i] instanceof Controller) {
				this[i].mount();
			}
		}
	}

	unmount() {
		if (this.view instanceof View) this.node.removeChild(this.view.render());
		this.removeListeners();
		for (const i in this) {
			if (this[i] instanceof Controller) {
				this[i].unmount();
			}
		}
	}

	flatMount() {
		if (this.view instanceof View) this.node.appendChild(this.view.render());
		this.setListeners();
	}
	init(mountAtInit = true) {
		if (mountAtInit) this.flatMount();
		for (const i in this) {
			if (this[i] instanceof Controller) {
				this[i].init(mountAtInit);
			}
		}
	}
}
