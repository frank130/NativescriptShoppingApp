import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular/router";


import { MainScreenComponent } from "./index/main-screen/main-screen.component";
import { ShoppingCartHomeComponent } from "./index/main-screen/shopping-cart-home/shopping-cart-home.component";
import { StoreScreenComponent } from "./index/main-screen/shopping-cart-home/store-screen/store-screen.component";

//All routing for navigation
const routes: Routes = [
    { path: "", redirectTo: "/index/main-screen", pathMatch: "full" },
    { path: "index/main-screen", component: MainScreenComponent },
    { path: "main-screen/shopping-cart-home", component: ShoppingCartHomeComponent },
    { path: "shopping-cart-home/store-screen", component: StoreScreenComponent }

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
