// to be removed in the future

const user: string = "admin";
const password: string = "!SuperMocneHasloNaCoderscamp231!";

const url: string = "cluster0-nsddk.gcp.mongodb.net/test";
const uri: string = `mongodb+srv://${user}:${password}@${url}?retryWrites=true&w=majority`;

export default uri;