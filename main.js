/* Global Variables */
var my_calculator = new calculator(displayCallback);
var equationArray = [];
var lastNumber = "";
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
    /*if(type == "equalSign") {
        equation += "=" + value;
        $("#equationDisplay").text(equation);
        equation = "";
    }else{
        equation += value;
        //display current equation
        $("#equationDisplay").text(equation);
        //TODO: display number string larger than one number in equation display correctly. EX. 12 not 112
    }*/
    //Print pressed button's value to the calculator
    $("#numberDisplay").text(value);
    //FOR TESTING
    console.log("Type: " + type); //will be 'number', 'operator', or 'equalSign'
}

