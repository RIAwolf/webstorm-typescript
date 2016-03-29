import {BrowserXhr} from "angular2/http";

export class CORSBrowserXHr extends BrowserXhr {
    build(): any {
        var xhr = super.build();
        xhr.withCredentials = true;
        return xhr;
    }
}