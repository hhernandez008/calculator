/* Global Variables */
var my_calculator = new calculator(userInputs);//uses script from LearningFuze to pass params to userInputs function
$(function(){

    $("button").on("click", function(){
        //What is the value of the pressed button
        var val = $(this).text();
        switch (val){
            // Clear everything in calculator memory (array)
            case 'AC':
                my_calculator.allClear(val);
                $numDisplay.text("");
                break;
            // Clear the current value in the calculator memory (array)
            case 'C':
                my_calculator.clear(val);
                $numDisplay.text("");
                break;
            //Add the pressed button's value to the calculator
            default:
                my_calculator.addItem(val);
        }
    });

    var $numDisplay = $("#numberDisplay");

});//end document ready function


/**
 * Take the user pressed button's value & add to the calculator display
 * @param type
 * @param value
 * @param item
 */
function userInputs(type, value, item){
    //Print pressed button's value to the calculator
    $("#numberDisplay").text(value);
    console.log("Type: " + type); //will be 'item added' 'calculated' or 'error'
}

