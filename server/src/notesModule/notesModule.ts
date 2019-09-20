import NoteService from "./core/service/noteService";
import RestInterface from "./interface/restInterface";
import MongoDbNotesRepository from "./infrastructure/mongoDbNotesRepository";

const notesModule = {
    NoteRepositoryImplementation: MongoDbNotesRepository,
    NoteServiceImplementation: NoteService,

    init: function() {
        let repository = new this.NoteRepositoryImplementation();
        let service = new this.NoteServiceImplementation(repository);
        
        return new RestInterface(service);
    }
}

export default notesModule;