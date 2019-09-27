import possibleColor from "./possibleColors";

export default class NoteCreatorModel {
	constructor(configurationObject) {
		if (configurationObject) {
			this.configurationObject = configurationObject;
		} else {
			this._config = {
				title: "",
				content: "",
				color: ""
			};
		}
	}

	set configurationObject(config) {
		if ("title" in config && "content" in config && "color" in config) {
			if (possibleColor.some(color => color == config.color)) {
				this._config = config;
			} else {
				throw TypeError("Invalid color value");
			}
		} else {
			throw TypeError("Invalid config parameter");
		}
	}

	get title() {
		return this._config.title;
	}

	get content() {
		return this._config.content;
	}

	get color() {
		return this._config.color;
	}

	set title(newTitle) {
		if (typeof newTitle === "string") {
			this._config.title = newTitle;
		} else {
			throw new TypeError("Title parameter must type of string");
		}
	}

	set content(newContent) {
		if (typeof newContent === "string") {
			this._config.content = newContent;
		} else {
			throw new TypeError("Title parameter must type of string");
		}
	}

	set color(newColor) {
		if (possibleColor.some(color => color == newColor)) {
			this._config.color = newColor;
		} else {
			throw TypeError("Invalid color value");
		}
	}

	validate() {
		return (
			this._config.title !== "" &&
			this._config.content !== "" &&
			this._config.color !== ""
		);
	}
}
