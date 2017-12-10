import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from "./app.component";
import {HttpModule} from "@angular/http";
import {ProjectFileModule} from "./projectFiles/ProjectFile.module";
import {WindowRef} from "./window";
import {BackendAPIService} from "./BackendAPI.service";



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        ProjectFileModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [WindowRef, BackendAPIService]
})
export class AppModule {
}
