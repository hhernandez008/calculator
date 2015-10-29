
var my_calculator = new calculator(userInputs);//uses script from LearningFuze to pass params to userInputs function

$(function(){
    //Number Buttons & decimal button click handler
    $("button").on("click", function(){
        var val = $(this).text();
        my_calculator.addItem(val);
    });


});//end document ready function


/**
 * Take the user pressed button's value & add to the calculator display
 * @param type
 * @param value
 * @param item
 */
function userInputs(type, value, item){
    $("#display").text(value);
    console.log(type); //will be 'item added' 'calculated' or 'error'

}



/*

 //LearningFuze Example Code
//callback function defined
function callback(type, value, item) {
    switch (value) {
        case undefined:
            $('#display').html("");
            break;
        default:
            $('#display').html(value);
            break;
    }
}
// my_calculator - creates a new calculator object
var my_calculator = new calculator(callback);
//after DOM load add click handlers to all buttons
$(document).ready(function () {
    $('button').on('click', function () {
        var val = $(this).text();
        switch (val) {
            case 'AC':
                my_calculator.allClear();
                break;
            default:
                my_calculator.addItem($(this).text());
                break;
        }
    });
});
*/
