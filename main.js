/* Global Variables */
var my_calculator = new calculator(userInputs);//uses script from LearningFuze to pass params to userInputs function

$(function(){

    //Number Buttons & decimal button click handler
    $("button").on("click", function(){
        var val = $(this).text();
        switch (val){
            case 'AC':
                my_calculator.allClear(val);
                $numDisplay.text("");
                break;
            case 'C':
                my_calculator.clear(val);
                $numDisplay.text("");
                break;
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

    $("#numberDisplay").text(value);
    console.log(type); //will be 'item added' 'calculated' or 'error'

}

