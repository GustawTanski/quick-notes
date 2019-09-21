import Color from "../../core/domain/color";

export default class PersistedNoteDto{
    noteId: string = "";
    authorId: string = "";
    title: string = "";
    content: string = "";
    color?: keyof typeof Color = undefined;
}