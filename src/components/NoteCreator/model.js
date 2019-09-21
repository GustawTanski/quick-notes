import possibleColor from "./possibleColors";

export default class NoteCreatorModel {
	constructor(configurationObject) {
		if (configurationObject) {
			this.configurationObject = configurationObject;
		} else {
			this._config = {
				title: "",
				message: "",
				color: ""
			};
		}
	}

	set configurationObject(config) {
		if ("title" in config && "message" in config && "color" in config) {
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

	get message() {
		return this._config.message;
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

	set message(newMessage) {
		if (typeof newMessage === "string") {
			this._config.message = newMessage;
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
			this._config.message !== "" &&
			this._config.color !== ""
		);
	}
}
