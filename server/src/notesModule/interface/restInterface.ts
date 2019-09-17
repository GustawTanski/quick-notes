import express, { Router } from "express";
import NoteServicePort from "../core/noteServicePort";

export default class RestInterface{
    private _router: Router;

    constructor(noteService: NoteServicePort){
        this._router = express.Router();

        this.router.use(express.json());

        this.router.get('/:user/notes',(req,res)=>{
            let notes = noteService.selectNotesByUserName(req.params.user);
            res.send(notes);
        })

        this.router.get('/:user/notes/:noteId',(req,res)=>{
            let note = noteService.selectNoteById(req.params.noteId);
            res.send(note);
        })
    }

    get router(): Router {
        return this._router;
    }
}