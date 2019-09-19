import Controller from "../../utils/Controller";
import TopBar from "../TopBar";
import SpinnerButton from "../SpinnerButton";
//import RegisterForm from "../RegisterForm";

export default class App extends Controller {
	constructor(node) {
		super(node);
		this.topBar = new TopBar(node);
		this.spinner = new SpinnerButton(node);
		//this.registerForm = new RegisterForm(node);
	}
}
