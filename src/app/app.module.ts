import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainScreenComponent } from "./index/main-screen/main-screen.component";
import { ShoppingCartHomeComponent } from "./index/main-screen/shopping-cart-home/shopping-cart-home.component";
import { StoreScreenComponent } from "./index/main-screen/shopping-cart-home/store-screen/store-screen.component";


//TO BE IMPLEMENTED: Used for user authentification login through firebase
const firebaseAuth = {
    apiKey: "AIzaSyDuTpz2cRtG6Ssjgx-CoSlTQ0b1vKnVN8s",
    authDomain: "test-project-7d0fc.firebaseapp.com",
    databaseURL: "https://test-project-7d0fc.firebaseio.com",
    projectId: "test-project-7d0fc",
    storageBucket: "",
    messagingSenderId: "322928714348"
  };

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseAuth),
        AngularFireAuthModule
    ],
    declarations: [
        AppComponent,
        MainScreenComponent,
        ShoppingCartHomeComponent,
        StoreScreenComponent
        ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
