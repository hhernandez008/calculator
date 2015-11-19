/* Global Variables */
var calculator = new calculator(displayNumbers);

var $numberDisplay = $("#number");
var $operatorDisplay = $("#operator");
var $equationHistoryDisplay = $("#equationDisplay");


$(document).ready(function(){

    $("button").on("click", function(){
        //What is the name of the pressed button
        var val = $(this).attr("name");
        checkValue(val);
    });

}); //end document ready function


/**
 * Take the user pressed button's value & add's it to the calculator display
 * @param type
 * @param value
 * @param array
 */
function displayNumbers(type, value, array){
    if(type != "operator") {
        //Print pressed button's value to the calculator
        $($numberDisplay).text(value);
        if(type == "equalSign") {
            $($operatorDisplay).text("=");
            displayEquHistory(array);
        }
    }else{
        $($operatorDisplay).text(value);
    }
}

function displayEquHistory(array){
        var $equPara = $("<p>",{
            text: array[0]
        });
        $($equationHistoryDisplay).append($equPara);
}

/**
 * checks the value passed in and calls a calculator function accordingly
 * @param value
 */
function checkValue (value){
    switch (value){
        case "AC":
            calculator.clearAll();
            $($numberDisplay).text("0");
            $($operatorDisplay).text("\xA0"); //non-breaking space with unicode literal
            break;
        case "C":
            calculator.clear();
            $($numberDisplay).text("0");
            break;
        default:
            calculator.addToEquation(value);
    }
}
