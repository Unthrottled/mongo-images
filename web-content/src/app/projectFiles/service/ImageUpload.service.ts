import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BackendAPIService} from "../../BackendAPI.service";
import {isDefined} from "../../Object.util";

@Injectable()
export class ImageUploadService {


    constructor(private backendAPIService: BackendAPIService) {
    }

    public uploadImage(reachFile: Observable<File>): Observable<string> {
        return reachFile
            .filter(isDefined)
            .map(reachFile => {
                let formData = new FormData();
                formData.append('reach', reachFile);
                return formData
            }).flatMap(formData =>
                this.backendAPIService.postImage(formData))
    }
}