import { Component, OnInit } from "@angular/core"
import { Location } from "@angular/common" // for back button
import * as ApplicationSettings from "@nativescript/core/application-settings"

import * as dialogs from "tns-core-modules/ui/dialogs";
import {
    inputType,
} from "tns-core-modules/ui/dialogs";
import { ShoppingCartHomeComponent } from "../shopping-cart-home.component";



@Component({
    selector: 'ns-store-screen',
    templateUrl: './store-screen.component.html',
    styleUrls: ['./store-screen.component.css'],

})

//Displays all items inside store that is possible for user to select
export class StoreScreenComponent implements OnInit{

    //properties of item
    public itemName: string;
    public itemQuantity: number;
    public itemPrice: number;


    //location allows user to go back
    private location: Location;
    //stores items already in cart from user
    private itemsInCart: Array<Object>;
    //items inside the shop
    public itemsAtShop: Array<Object>;


    //constructor that pushes all items of store to the screen and inside array object
    constructor(location: Location)
    {
        this.location = location;
        //storage of serialized objects
        this.itemsInCart = JSON.parse(ApplicationSettings.getString("items", "[]"));

        //initialize and add items into array
        this.itemsAtShop = [];

        this.itemsAtShop.push({itemName: "Pear", itemQuantity: 1, itemPrice: 0.99});
        this.itemsAtShop.push({itemName: "Avocado", itemQuantity: 1, itemPrice: 1.89});
        this.itemsAtShop.push({itemName: "Milk", itemQuantity: 1, itemPrice: 3.99});
        this.itemsAtShop.push({itemName: "Melon", itemQuantity: 1, itemPrice: 4.99});
        this.itemsAtShop.push({itemName: "Apple", itemQuantity: 1, itemPrice: 1.54});
        this.itemsAtShop.push({itemName: "Chocolate", itemQuantity: 1, itemPrice: 5.49});
        this.itemsAtShop.push({itemName: "Muffin", itemQuantity: 1, itemPrice: 3.29});
        this.itemsAtShop.push({itemName: "Coffee", itemQuantity: 1, itemPrice: 4.99});
        this.itemsAtShop.push({itemName: "Salad", itemQuantity: 1, itemPrice: 3.54});
    }

    //goes back to shopping-cart-home
    goBack(): void {
        this.location.back();
    }

    //addToCart(item) --> displays Dialog popup to add the selected item into the shopping cart
    addToCart(item)
    {

        dialogs.prompt({
            title: "Select Your Quantity",
            message: "How many " + item.itemName + "s would you like to buy?",
            okButtonText: "Add",
            cancelButtonText: "Nevermind",
            inputType: inputType.number

        }).then(result => {

            if(result.result == true)
            {
                //Checks if input box is null
                if(result.text != "")
                {

                    //parsing textbox that stores quantity into a number
                    let finalItemPrice = parseInt(result.text) * item.itemPrice;
                    finalItemPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                      });

                    //integer that is only 0 or greater if the selected item is already in user's cart
                    //if it is already in cart, then the quantity and price are added
                    //else, the whole new item is added into cart
                    let existsInCart = -1;

                    //iterate through itemsInCart, if selected item name is found, set existsInCart index integer to the found array index
                    for(let i = 0; i < this.itemsInCart.length; i++)
                    {
                        if(item.itemName == this.itemsInCart[i].itemName)
                        {
                            existsInCart = i;
                        }
                    }
                    //selected item was found inside shopping cart already
                    if(existsInCart !== -1){
                        //adds the quantity and price to existing item inside shopping cart through its array index
                        this.itemsInCart[existsInCart].itemQuantity += parseInt(result.text);
                        this.itemsInCart[existsInCart].itemPrice += finalItemPrice;
                    }
                    //else this new item is pushed onto array
                    else
                    {
                        this.itemsInCart.push({itemName: item.itemName, itemQuantity: parseInt(result.text), itemPrice: finalItemPrice});
                    }
                    //local store is reconfigurated, and app goes back to shopping-cart-home
                    ApplicationSettings.setString("items", JSON.stringify(this.itemsInCart));

                    this.location.back();
                }
            }

        });


    }

    ngOnInit(): void {

    }

}
