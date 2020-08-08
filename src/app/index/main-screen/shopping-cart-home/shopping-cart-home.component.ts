import { Component, OnInit } from "@angular/core"
import { Location } from "@angular/common" // for back button
import * as ApplicationSettings from "@nativescript/core/application-settings"
import * as dialogs from "tns-core-modules/ui/dialogs";
import { inputType } from "tns-core-modules/ui/dialogs";


@Component({
    selector: 'ns-shopping-cart-home',
    templateUrl: './shopping-cart-home.component.html',
    styleUrls: ['./shopping-cart-home.component.css'],

})

//Displays All Shopping Cart items, Total Price
//Allows functionalities to Clear Shopping Cart and Add New Items
export class ShoppingCartHomeComponent implements OnInit{

    //stores items currently inside user's cart
    //must be declared public to view on screen
    public itemsInCart: Array<Object>;

    //total price that is dispalyed on html
    public totalPrice: number;

    //location allows user to go back
    private location: Location;

    constructor(location: Location)
    {
        //storage of serialized objects on local device
        this.itemsInCart = JSON.parse(ApplicationSettings.getString("items", "[]"));


        this.location = location;
        //use location for back events, constructor only called when first navigated to
        location.subscribe((path) => {
            this.itemsInCart = JSON.parse(ApplicationSettings.getString("items", "[]"));
        });

        //calculates the total price of all items and displays on screen
        this.calculateTotalPrice();


    }


    goBack(): void {
        this.location.back();
    }

    //calculateTotalPrice() --> Sets total price label to 0 if no items are found, else it adds all prices of items and is displayed in totalPrice
    calculateTotalPrice()
    {
        let price = 0;

        //If no items, price is 0
        if(this.itemsInCart.length < 1)
        {
            this.totalPrice = 0;
        }
        else
        {
            //iterate through all items, add them to price, and total them
            for(let i = 0; i < this.itemsInCart.length; i++)
            {
                price += this.itemsInCart[i].itemPrice;
            }
        }

        this.totalPrice = price;

        this.totalPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          });
    }

    //editItemCart(item) --> displays Dialog popup to edit an item if it is tapped on
    editItemCart(item)
    {

        dialogs.action({
            message: "Changing: " + item.itemName + ', Quantity: ' + item.itemQuantity + ', Price: $' + item.itemPrice,
            cancelButtonText: "Cancel",
            actions: ["Change Quantity", "Remove Item"]
        }).then(result => {

            //If Change Quantity is tapped on, call function to alter item quantity
            if(result == "Change Quantity"){

                this.changeItemQuantity(item);
            }
            //If removing item is tapped on
            else if(result == "Remove Item")
            {
                //Iterates through itemsInCart array, selects item that was tapped on, and deletes it
                this.itemsInCart.forEach( (item1, index) => {
                    if(item1 === item) this.itemsInCart.splice(index,1);
                  });

                //local storage is reconfigured and price is recounted
                ApplicationSettings.setString("items", JSON.stringify(this.itemsInCart));

                this.calculateTotalPrice();
            }

        });
    }

    //changeItemQuantity(item) --> displays Dialog popup to ask for input of new quantity of item
    changeItemQuantity(item)
    {
        dialogs.prompt({
            title: "Select Your New Quantity",
            message: "How many " + item.itemName + "s would you like to buy?",
            okButtonText: "Change",
            cancelButtonText: "Nevermind",
            inputType: inputType.number

        }).then(result => {

            //Checks if quantity is confirmed
            if(result.result == true)
            {
                //If 0 is entered into input, then remove item from local storage and array object
                if(result.text == "0")
                {
                    //Iterates through itemsInCart array, selects item that was tapped on, and deletes it
                    this.itemsInCart.forEach( (item1, index) => {
                        if(item1 === item) this.itemsInCart.splice(index,1);
                      });


                    //local storage is reconfigured and price is recounted
                    ApplicationSettings.setString("items", JSON.stringify(this.itemsInCart));


                    this.calculateTotalPrice();

                }
                //else changes the quantity of the item
                else
                {
                    //retrieves intial price of item by dividing previous price by previous quantity
                    let initialItemPrice = item.itemPrice / item.itemQuantity;

                    //multiple initial price by new quantity to retrieve total price of item
                    let finalItemPrice = parseInt(result.text) * initialItemPrice;


                    finalItemPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                      });

                    item.itemQuantity = result.text;
                    item.itemPrice = finalItemPrice;


                    ApplicationSettings.setString("items", JSON.stringify(this.itemsInCart));

                    this.calculateTotalPrice();
                }

            }


        });
    }
    //clearCart() --> displays Dialog popup and removes all items in user's cart
    clearCart()
    {
        dialogs.action({
            message: "Clear Your Cart?",

            actions: ["Yes", "Nevermind"]
        }).then(result => {
            //If yes, then items are removed from local storage and array is emptied
            if(result == "Yes"){

                ApplicationSettings.remove("items");

                this.itemsInCart.length = 0;

                this.calculateTotalPrice();
            }
        });


    }

    ngOnInit(): void {

    }

}
