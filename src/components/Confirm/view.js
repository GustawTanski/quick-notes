import View from "../../utils/View";

export default class ConfirmView extends View {
	constructor(message) {
		super();
		this.element = document.createElement("div");
		this.element.innerHTML = `
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${message}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    <button type="button" class="btn btn-primary">Yes</button>
                </div>
            </div>
            </div>
        </div>
        `;
		this.modal = this.element.querySelector(".modal");
		this.buttonYes = this.element.querySelector(".btn-primary");
		this.buttonNo = this.element.querySelector(".btn-secondary");
	}
}
