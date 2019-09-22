import "reflect-metadata";
import * as jf from "joiful";
import { $enum } from "ts-enum-util";
import Color from "../../core/domain/color";

export default class NewNoteDto{
    @jf.string().required().min(1)
    title: string = "";

    @jf.string().required().min(3)
    content: string = "";

    @jf.string().required().valid($enum(Color).getKeys())
    color?: keyof typeof Color = undefined;
}