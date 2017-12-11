
import {Injectable} from "@angular/core";
import {BackendAPIService} from "../../BackendAPI.service";
import {WindowRef} from "../../window";
import {RemoteProjectFile} from "../model/RemoteProjectFile";
import {Identifier} from "../model/Identifier.model";
import {LocalProjectFile} from "../model/LocalProjectFile";

@Injectable()
export class LocalProjectFileService {
    private static localProjectCount: number = 0;

    constructor(){}

    public createLocalProject(): LocalProjectFile {
        return new LocalProjectFile(++LocalProjectFileService.localProjectCount + '');
    }

}