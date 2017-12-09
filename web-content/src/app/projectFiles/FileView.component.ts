import {Component, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'file-view',
    template: require('./FileView.component.htm')
})
export class FileViewComponent {

    constructor() {
    }

    // private _project: Project;
    //
    // @Input()
    // get project(): Project {
    //     return this._project;
    // }
    //
    // set project(value: Project) {
    //     this._project = value;
    // }

    get reachBinary(): Observable<any> {
        return Observable.empty();
    }

}