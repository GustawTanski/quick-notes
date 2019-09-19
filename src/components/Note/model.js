import possibleColors from "./possibleColors";
export default class NoteModel {
	constructor(config) {
		this.config = config;
	}

	set config(config) {
		if ("color" in config && "title" in config && "content" in config) {
			if (!possibleColors.some(color => color == config.color))
				throw Error("Wrong color!");
			this._config = config;
		} else {
			throw TypeError("Wrong config param!");
		}
	}

	get config() {
		return this._config;
	}

	setConfig(config) {
		for (let i in config) {
			if (i in this.config) this._config[i] = config[i];
			else throw TypeError("Wrong property: " + i);
		}
	}
}
