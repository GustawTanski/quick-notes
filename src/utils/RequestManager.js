import axios from "axios";

class RequestManager {
	constructor() {
		this.requester = axios.create({
			baseURL: "http://localhost:5000"
			// typeof API_SERVER_URL === "undefined"
			// 	? "http://localhost:5000"
			// 	: API_SERVER_URL
		});
	}

	async postRegisterCredentials(email, password) {
		try {
			const response = await this.requester.post(
				"/register",
				{},
				{
					auth: {
						username: email,
						password
					}
				}
			);
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.log(error.response.data || {});
			return error.response.data || {};
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

			this.requester.defaults.headers.common["x-auth-token"] =
				response.headers["x-auth-token"];

			console.log(response.data);
			return response.data;
		} catch (error) {
			console.log(error.response.data || {});
			return error.response.data || {};
		}
	}

	logout(){
		delete this.requester.defaults.headers.common["x-auth-token"];
	}

	async getNote(user, noteID) {
		try {
			const response = await this.requester.get(`/${user}/notes/${noteID}`);
			return response.data;
		} catch (error) {
			console.log(error.response.data || {});
			return error.response.data ||{};
		}
	}

	async getNotes(user) {
		try {
			const response = await this.requester.get(`/${user}/notes`);
			if (response.status == "200") return response.data.notes;
		} catch (error) {
			console.log(error.response.data || {});
			return error.response.data || {};
		}
	}

	async postNote(user, color, message,title) {
		try {
			const response = await this.requester.post(`/${user}/notes`, {
				color,
				message,
				title
			});
			return response.data;
		} catch (error) {
			console.log(error.response.data || {});
			return error.response.data || {};
		}
	}

	async putNote(user, noteID, color, message,title) {
		try {
			const response = await this.requester.put(`/${user}/notes/${noteID}`, {
				color,
				message,
				title
			});
			return response.data;
		} catch (error) {
			console.log(error.response.data || {});
			return error.response.data || {};
		}
	}

	async deleteNote(user, noteID) {
		try {
			const response = await this.requester.delete(`/${user}/notes/${noteID}`);
			return response.data;
		} catch (error) {
			console.log(error.response.data || {});
			return error.response.data || {};
		}
	}
}
const requestManager = new RequestManager();
export default requestManager;
