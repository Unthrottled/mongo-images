
import {Injectable} from "@angular/core";
import {BackendAPIService} from "../../BackendAPI.service";
import {WindowRef} from "../../window";
import {RemoteProjectFile} from "../model/RemoteProjectFile";
import {Identifier} from "../model/Identifier.model";

@Injectable()
export class RemoteProjectFileService {

    constructor(private backendAPISevice: BackendAPIService, private windowRef: WindowRef){}

    public fetchRemoteProject(fileId: string): RemoteProjectFile {
        return new RemoteProjectFile(new Identifier(fileId),
            this.backendAPISevice.fetchImage(fileId)
                .map(arrayBuffer=>{
                    let binary = '';
                    let bytes = new Uint8Array(arrayBuffer);
                    let len = bytes.byteLength;
                    for(let i = 0; i < len; ++i){
                        binary += String.fromCharCode(bytes[i]);
                    }
                    return 'data:image/png;base64,' + this.windowRef.nativeWindow.btoa(binary);
                }));
    }

}