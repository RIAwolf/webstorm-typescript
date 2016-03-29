import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";

import {OnInit} from "angular2/core";

@Component({
    directives: [ROUTER_DIRECTIVES],
    selector: 'app-container',
    templateUrl: 'modules/home/home.html',
    providers: []

})

export class HomeComponent implements OnInit{


    constructor(
        /*@Inject(HomeAppListService) private appListService: HomeAppListService,
        @Inject(Location) private pathLocation: Location*/

    ) {
        alert('ok');
    }

    ngOnInit():any {
       /* var result=this.appListService.getAllApps();
        result.then((response : Array<AppVO>)=>{
            if(this.pathLocation.path()!='/exactag'){
                this.newApps=[];
            }else{
                this.newApps=response;
            }


        });
        return undefined;*/
    }




}