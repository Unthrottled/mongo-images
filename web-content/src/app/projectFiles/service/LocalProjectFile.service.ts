import {Injectable} from "@angular/core";
import {LocalProjectFile} from "../model/LocalProjectFile";

@Injectable()
export class LocalProjectFileService {
    private static localProjectCount: number = 0;

    constructor(){}

    public createLocalProject(): LocalProjectFile {
        return new LocalProjectFile(++LocalProjectFileService.localProjectCount + '');
    }

}