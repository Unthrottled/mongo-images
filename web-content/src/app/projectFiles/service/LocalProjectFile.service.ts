import {Injectable} from "@angular/core";
import {LocalProjectFile} from "../model/LocalProjectFile";
import {Identifier} from "../model/Identifier.model";

@Injectable()
export class LocalProjectFileService {
    private static localProjectCount: number = 0;

    constructor(){}

    public createLocalProject(): LocalProjectFile {
        return new LocalProjectFile(new Identifier(++LocalProjectFileService.localProjectCount + ''));
    }

}