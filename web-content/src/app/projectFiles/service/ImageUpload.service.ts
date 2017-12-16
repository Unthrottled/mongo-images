import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BackendAPIService} from "../../services/BackendAPI.service";
import {isDefined} from "../../util/Object.util";

@Injectable()
export class ImageUploadService {


    constructor(private backendAPIService: BackendAPIService) {
    }

    public uploadImage(reachFile: Observable<File>): Observable<string> {
        return reachFile
            .filter(isDefined)
            .map(reachFile => {
                let formData = new FormData();
                /**
                 * The name that we append to the form has to correspond
                 * to the name of the parameter in the method signature
                 * in the REST controller.
                 */
                formData.append('projectFile', reachFile);
                return formData
            }).flatMap(formData =>
                this.backendAPIService.postImage(formData))
    }
}