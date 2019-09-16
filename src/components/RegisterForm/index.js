import Controller from "../../utils/Controller";
import Model from "./model";
import View from "./view";

export default class RegisterForm extends Controller {
    constructor(node) {
        super(node);
        this.model = new Model();
        this.view = new View();
    }
}