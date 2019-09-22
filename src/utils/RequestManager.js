import axios from "axios";

class RequestManager {
	constructor() {
		this.requester = axios.create({
			baseURL: "http://quick-notes-253112.appspot.com"
		});
		this._setTokenInHeader();
	}

	_setTokenInHeader() {
		this.requester.interceptors.request.use(
			config => {
				config.headers["x-auth-token"] = sessionStorage.getItem("token"); // may be undefined
				return config;
			},
			error => {
				return Promise.reject(error);
			}
		);
	}

	async postRegisterCredentials(email, password) {
		try {
			const { data, status } = await this.requester.post(
				"/register",
				{},
				{
					auth: {
						username: email,
						password
					}
				}
			);
			return { data, status };
		} catch (error) {
			if (error.response) {
				const { data, status } = error.response;
				return { data, status };
			}
			console.log(error.message);
			return error.message;
		}
	}

	async postLoginCredentials(email, password) {
		try {
			const response = await this.requester.post(
				"/login",
				{},
				{
					auth: {
						username: email,
						password
					}
				}
			);
			const { data, status } = response;
			sessionStorage.setItem("token", response.headers["x-auth-token"]);
			this._setTokenInHeader();
			return { data, status };
		} catch (error) {
			if (error.response) {
				const { data, status } = error.response;
				return { data, status };
			}
			return error.message;
		}
	}

	logout() {
		// delete this.requester.defaults.headers.common["x-auth-token"];

		sessionStorage.setItem("token", undefined);
		this._setTokenInHeader();
	}

	async getNote(noteID) {
		try {
			const { data, status } = await this.requester.get(`/notes/${noteID}`);
			return { data, status };
		} catch (error) {
			if (error.response) {
				const { data, status } = error.response;
				return { data, status };
			}
			return error.message;
		}
	}

	async getNotes() {
		try {
			const { data, status } = await this.requester.get(`/notes`);
			return { data, status };
		} catch (error) {
			if (error.response) {
				const { data, status } = error.response;
				return { data, status };
			}
			console.log(error.message);
			return error.message;
		}
	}

	async postNote(color, content, title) {
		try {
			const { data, status } = await this.requester.post(`/notes`, {
				color,
				content,
				title
			});
			return { data, status };
		} catch (error) {
			if (error.response) {
				const { data, status } = error.response;
				return { data, status };
			}
			console.log(error.message);
			return error.message;
		}
	}

	async putNote(noteID, color, content, title) {
		try {
			const { data, status } = await this.requester.put(`/notes/${noteID}`, {
				color,
				content,
				title
			});
			return { data, status };
		} catch (error) {
			if (error.response) {
				const { data, status } = error.response;
				return { data, status };
			}
			console.log(error.message);
			return error.message;
		}
	}

	async deleteNote(noteID) {
		try {
			const { data, status } = await this.requester.delete(`/notes/${noteID}`);
			return { data, status };
		} catch (error) {
			if (error.response) {
				const { data, status } = error.response;
				return { data, status };
			}
			console.log(error.message);
			return error.message;
		}
	}
}
const requestManager = new RequestManager();
export default requestManager;
