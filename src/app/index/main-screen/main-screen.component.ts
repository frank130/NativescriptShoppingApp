import { Component, OnInit } from "@angular/core"
import { Location } from "@angular/common" // for back button
import * as ApplicationSettings from "@nativescript/core/application-settings"
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
    selector: 'ns-main-screen',
    templateUrl: './main-screen.component.html',
    styleUrls: ['./main-screen.component.css'],

})

//Displaying Main Screen, with login TO BE IMPLEMENTED
export class MainScreenComponent implements OnInit{

    //Holds username and password text fields, not yet used
    public username: string;
    public password: string;

    constructor()
    {
        this.username="";
        this.password="";

    }

    //Following functions are to be implemented
    login()
    {
        //Implement Firebase authentification back-end here
    }

    register()
    {
        //Implement Firebase registration back-end here
    }

    ngOnInit(): void {

    }
}
