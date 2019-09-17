import NoteService from "./core/service/noteService";
import MockRepo from "./infrastructure/mockRepo";
import RestInterface from "./interface/restInterface";

const notesModule = {
    NoteRepositoryImplementation: MockRepo,
    NoteServiceImplementation: NoteService,

    init: function() {
        let repository = new this.NoteRepositoryImplementation();
        let service = new this.NoteServiceImplementation(repository);
        
        return new RestInterface(service);
    }
}

export default notesModule;