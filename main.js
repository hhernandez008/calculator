/* Global Variables */
var calculator = new calculator(displayNumbers);


$(document).ready(function(){

    $("button").on("click", function(){
        //What is the name of the pressed button
        var val = $(this).attr("name");
        calculator.checkValue(val);
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
        $("#number").text(value);
        if(type == "equalSign") {
            $("#operator").text("=");
            displayEquHistory(array);
        }
    }else{
        $("#operator").text(value);
    }
}

function displayEquHistory(type, value){
        var $equPara = $("<p>",{
            text: array[i]
        });
        $("#equationDisplay").append($equPara);

}
