//Calculator Object
//called(type, value, item)
var calculator = function(called){
    var self = this;
    var error = false;

    //function passed to the calculator object on creation
    self.fun = called;

    /**
     * Calls method based on the value passed in.
     * @param value
     */
    self.checkValue = function(value){
        switch (value){
            case "AC":
                self.clearAll();
                break;
            case "C":
                self.clear();
                break;
            default:
                self.addToEquation(value);
        }
    };

    /**
     * Tests the value passed & creates number groups or passes any operators (+, -, /, *, =) to the operators method.
     * Calls the function passed to the object & returns the object type & value.
     * @param value
     */
    self.addToEquation = function(value){
        var val = value;
        var valObject = {};
        valObject.type = "number";
        
        //check if the value is a number, operator, decimal, or +/-
        if(isNaN(val)){
            switch (val){
                case "decimal":
                    if(lastNumber.length > 0){
                        if(lastNumber.indexOf(".") > 0) {
                            //prevent multiple decimals from being added
                            return;
                        }else {
                            lastNumber += ".";
                            valObject.value = lastNumber;
                            equationArray[equationArray.length - 1] = valObject;
                        }
                    }else{
                        lastNumber = "0.";
                        valObject.value = lastNumber;
                        equationArray.push(valObject);
                    }
                    break;
                case "negate": // +/-
                    //Change sign (positive or negative) for either current stored number or solution
                    //TODO: if only +/- pressed over & over, - stays on display need to pass empty value
                    if(lastNumber.length > 0){
                        if(lastNumber == "-"){
                            lastNumber = "";
                            equationArray.pop();
                        }else {
                            lastNumber = "" + ((-1) * parseFloat(lastNumber));
                            valObject.value = lastNumber;
                            equationArray[equationArray.length - 1] = valObject;
                        }
                    }else{
                        lastNumber = "-";
                        valObject.value = lastNumber;
                        equationArray.push(valObject);
                    }
                    break;
                default:
                    lastNumber = "";
                    //plus, minus, divide, multiply, equals
                    self.operators(valObject, val);
            } //end switch(val)
        // end true, if(isNaN(val))
        }else{
            //clear array if new number is pressed after the equals sign is pressed
            if(equationArray != "" && equationArray[(equationArray.length-1)].type == "equalSign"){
                equationArray = [];
            }
            //add the number to the lastNumber variable
            lastNumber += val;
            valObject.value = lastNumber;
            //store in equationArray; overwrite last index with new number, if multiple numbers pressed before operand
            if(lastNumber.length > 1){
                equationArray[equationArray.length - 1] = valObject;
            } else{
                equationArray.push(valObject);
            }
        } //end if/else

        if (error){
            self.fun("Error", "Error");
            equationArray = [];
            error = false;
        }
        //pass the object type & value into the called function
        self.fun(valObject.type, valObject.value);
    }; //end addToEquation method

    /**
     * Determine the value of the operator, if equals pass to the equals method, store all others.
     * @param object
     * @param value
     */
    self.operators = function(object, value){
        object.type = "operator";
        //prevent operator from being the first value stored
        if(equationArray.length < 1){
            //TODO: prevent undefined from returning to equation display
            return;
        }
        //set value of the operator pressed
        switch (value) {
            case "add":
                object.value = "+";
                break;
            case "subtract":
                object.value = "-";
                break;
            case "multiply":
                object.value = "*";
                break;
            case "divide":
                object.value = "/";
                break;
            default: //equals
                object.value = "=";
                object.value = self.equals(object);
                equationArray[0] = object;
                object.type = "equalSign";
                return;
        }

        if(equationArray.length == 3){
            //array holds 2 numbers & 1 operator, if 2nd operator (besides equals) pressed solve the current array
            var calculatedObject = {};
            self.equals(calculatedObject);
            equationArray.push(object);
        } else if(equationArray[equationArray.length - 1].type == "operator"){
            //prevent operators from being stored consecutively, last operator pressed stored
            equationArray[equationArray.length - 1] = object;
        }else{
            equationArray.push(object);
        }
    }; //end operators method

    /**
     * Solve equation: Array to only hold 3 values.
     * Check the operand pressed and solve the equation based on the value of the operand stored in index[1]
     * does not take into account order of operations as numbers are equated as entered, Returns solved equation
     * @param object
     */
    self.equals = function (object) {
        object.type = "number";
        //will only run if the equals button is pressed
        if (equationArray.length < 3) {
            //TODO: MAKE WORK FOR 1+1= = = 4
            if (equationArray.length === 1 && equationArray[0].type === "equalSign") {
                var repeatOperator = {
                    //operator from index 0's history
                    type: equationArray[0].history[1].type,
                    value: equationArray[0].history[1].value
                };
                var repeatOperand = {
                    //second operand from index 0's history
                    type: equationArray[0].history[2].type,
                    value: equationArray[0].history[2].value
                };
                equationArray.push(repeatOperator, repeatOperand);
                return self.equals(object);

            } else if (equationArray.length === 1){
                object.value = equationArray[0].value;
            } else if (equationArray.length === 2) {
                object.value = equationArray[0].value;
                equationArray.push(object);
                self.equals(object);
            } else {
                return;
            }
        }else{
            switch (equationArray[1].value) {
                case "+":
                    object.history = [equationArray[0], equationArray[1], equationArray[2]];
                    object.value = parseFloat(equationArray[0].value) + parseFloat(equationArray[2].value);
                    break;
                case "-":
                    object.history = [equationArray[0], equationArray[1], equationArray[2]];
                    object.value = parseFloat(equationArray[0].value) - parseFloat(equationArray[2].value);
                    break;
                case "/":
                    //error if divide by zero
                    if (parseFloat(equationArray[2].value) == 0) {
                        object.type = "error";
                        object.value = "Error";
                        error = true;
                        return;
                    } else {
                        object.history = [equationArray[0], equationArray[1], equationArray[2]];
                        object.value = parseFloat(equationArray[0].value) / parseFloat(equationArray[2].value);
                    }
                    break;
                case "*":
                    object.history = [equationArray[0], equationArray[1], equationArray[2]];
                    object.value = parseFloat(equationArray[0].value) * parseFloat(equationArray[2].value);
                    break;
                default:
                    console.log("Unknown operator: " + value);
            }
        }
        equationArray = [];
        equationArray.push(object);
        return object.value;
    }; //end equals method

    /**
     * Clear all of the values held in the array, lastNumber, & clear display
     */
    self.clearAll = function(){
        $("#display").text("0");
        //$("#equationHistory").text("");
        equation = "";
        equationArray = [];
        lastNumber = "";
    }; //end clearAll method

    /**
     * Clear lastNumber or operator from array, number display, & equation display
     */
    self.clear = function(){
        $("#display").text("0");
        //TODO: how to clear last entered item from equation display.
        equationArray.pop();
        lastNumber = "";
    }; //end clear method


}; //END calculator object











