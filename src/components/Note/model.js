import possibleColors from "./possibleColors";
export default class NoteModel {
	constructor(config) {
		this.config = config;
	}

	set config(config) {
		if (this._hasConfigNeededProps(config)) {
			if (!this._havePropsProperTypes(config))
				throw Error("Some props have wrong type!");
			this._config = config;
		} else {
			throw TypeError("Some needed props are missing!");
		}
	}

	get config() {
		return this._config;
	}

	_hasConfigNeededProps(config) {
		const propNames = ["color", "title", "content", "authorId", "noteId"];
		return propNames.every(propName => propName in config);
	}

	_havePropsProperTypes(config) {
		const isColorGood = possibleColors.some(color => color == config.color);
		const strings = ["title", "content", "authorId", "noteId"];
		return (
			isColorGood && strings.every(string => typeof config[string] == "string")
		);
	}

	setConfig(config) {
		for (let i in config) {
			if (i in this.config) this._config[i] = config[i];
			else throw TypeError("Wrong property: " + i);
		}
	}
}
