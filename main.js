/* Global Variables */
var my_calculator = new calculator(displayCallback);//uses script from LearningFuze to pass params to userInputs function
var equation = "";
$(function(){

    $("button").on("click", function(){
        //What is the value of the pressed button
        var val = $(this).text();
        switch (val){
            // Clear everything in calculator memory (array)
            case 'AC':
                my_calculator.allClear(val);
                $numDisplay.text("");
                $equDisplay.text("");
                equation = "";
                break;
            // Clear the current value in the calculator memory (array)
            case 'C':
                my_calculator.clear(val);
                $numDisplay.text("");
                //TODO: how to clear last entered item from equation display.
                break;
            //Add the pressed button's value to the calculator
            default:
                my_calculator.addItem(val);
        }
    });

    var $numDisplay = $("#numberDisplay");
    var $equDisplay = $("#equationDisplay");

});//end document ready function


/**
 * Take the user pressed button's value & add's it to the calculator display
 * @param type
 * @param value
 * @param item
 */
function displayCallback(type, value, item){
    if(type != "calculated") {
        equation += value;
        //display current equation
        $("#equationDisplay").text(equation);
        //TODO: display number string larger than one number in equation display correctly.
    }
    //Print pressed button's value to the calculator
    $("#numberDisplay").text(value);
    console.log("Type: " + type); //will be 'item added' 'calculated' or 'error'
}

//check value function, checks if the button pressed is a operator, operand, decimal, AC, C, or +/-

//store number function, determines if the number is first or later in string of numbers, or comes after an operand
// & stores them in an array for equating

//solve equation function, checks the operand pressed and solves the equation of the first two values stored( 1 +
// 3), does not take into account order of operations as numbers are equated as entered, Returns solved equation

