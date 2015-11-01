/* Global Variables */
//var my_calculator = new calculator(displayCallback);//uses script from LearningFuze to pass params to userInputs function
var equationArray = [];
var lastPressed = "";
var equation = "";
$(function(){

    $("button").on("click", function(){
        //What is the name of the pressed button
        var val = $(this).attr("name");
        checkValue(val);
    });

    var $numDisplay = $("#numberDisplay");
    var $equDisplay = $("#equationDisplay");

});//end document ready function


/**
 * Take the user pressed button's value & add's it to the calculator display
 * @param type
 * @param value
 * //@param item; to be added in later
 */
function displayCallback(type, value){
    if(type != "calculated") {
        equation += value;
        //display current equation
        $("#equationDisplay").text(equation);
        //TODO: display number string larger than one number in equation display correctly. EX. 12 not 112
    }
    //Print pressed button's value to the calculator
    $("#numberDisplay").text(value);
    console.log("Type: " + type); //will be 'number', 'operator', or 'equalSign'
}

//check value function, checks if the button pressed is a operator, operand, decimal, AC, C, or +/-
function checkValue(value){
    switch (value){
        case "AC":
            clearAll();
            break;
        case "C":
            clear();
            break;
        default:
            calcOperation(value);
    } //end switch statement
}

//store number function, determines if the number is first or later in string of numbers, or comes after an operand
// & stores them in an array for equating
function calcOperation(value){
    var val = value;
    var valObject = {};
    //check if the value is a number, operator, decimal, or +/-
    if(isNaN(val)){
        //FOR TESTING
        console.log('NaN');
        valObject.type = "operator";
        switch (val){
            //TODO: verify a number was added to array before adding operator
            //TODO: only allow one operator to be inputted
            case "decimal":
                valObject.type = "number";
                if(lastPressed.length > 0){
                    lastPressed += ".";
                    valObject.value = lastPressed;
                    equationArray[equationArray.length - 1] = valObject;
                }else{
                    lastPressed += "0.";
                    valObject.value = lastPressed;
                    equationArray.push(valObject);
                }
                break;
            case "negate":
                //TODO: change sign (positive or negative) for either current stored number or solution
                //TODO: if only +/- pressed over & over
                if(lastPressed.length > 0){
                    if(lastPressed == "-"){
                        lastPressed = "";
                        equationArray.pop();
                    }else {
                        lastPressed = (-1) * parseFloat(lastPressed);
                        valObject.value = "" + lastPressed;
                        equationArray[equationArray.length - 1] = valObject;
                    }
                }else{
                    lastPressed = "-";
                    valObject.value = lastPressed;
                    equationArray.push(valObject);
                }
                break;
            case "add":
                lastPressed = "";
                valObject.value = "+";
                equationArray.push(valObject);
                break;
            case "subtract":
                lastPressed = "";
                valObject.value = "-";
                equationArray.push(valObject);
                break;
            case "multiply":
                lastPressed = "";
                valObject.value = "*";
                equationArray.push(valObject);
                break;
            case "divide":
                lastPressed = "";
                valObject.value = "/";
                equationArray.push(valObject);
                break;
            default: //equals
                lastPressed = "";
                valObject.type = "equalSign";
                valObject.value = "=";
                //equals();
                console.log("equals");
        } //end switch
    }else{
        valObject.type = "number";
        //add the number to the lastPressed variable
        lastPressed += val;
        valObject.value = lastPressed;
        //store in equationArray; overwrite last index with new number multiple numbers pressed before operand
        if(lastPressed.length > 1){
            equationArray[equationArray.length - 1] = valObject;
        } else{
            equationArray.push(valObject);
        }
    } //end if/else

    //FOR TESTING: what is the value of lastPressed?
    console.log(lastPressed);
    //FOR TESTING: what is in the array?
    console.log(equationArray);
    displayCallback(valObject.type, valObject.value);
} //end calcOperation function

//solve equation function, checks the operand pressed and solves the equation of the first two values stored( 1 +
// 3), does not take into account order of operations as numbers are equated as entered, Returns solved equation



// clear all of the values from array & clear display
function clearAll(){
    $("#numberDisplay").text("");
    $("#equationDisplay").text("");
    equation = "";
    equationArray = [];
    lastPressed = "";
}

// clear last inputted button group or operator from array, number display, & equation display
function clear(){
    $("#numberDisplay").text("");
    //TODO: how to clear last entered item from equation display.
    equationArray.pop();
    lastPressed = "";
}
