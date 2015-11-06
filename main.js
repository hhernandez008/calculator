/* Global Variables */
var my_calculator = new calculator(displayCallback);
var equationArray = [];
var calcMemoryArray = [];//store past equations
//var lastNumber = "";
var equation = "";

$(document).ready(function(){

    $("button").on("click", function(){
        //What is the name of the pressed button
        var val = $(this).attr("name");
        my_calculator.checkValue(val);
    });

}); //end document ready function


/**
 * Take the user pressed button's value & add's it to the calculator display
 * @param type
 * @param value
 * //@param item; to be added in later
 */
function displayCallback(type, value){
    if(type != "operator") {
        //Print pressed button's value to the calculator
        $("#display").text(value);
    }
    //FOR TESTING
    console.log("Type: " + type); //will be 'number', 'operator', or 'equalSign'
}

