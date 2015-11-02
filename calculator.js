//Calculator Object
//called(type, value, item)
var calculator = function(called){
    var self = this;
    self.fun = called;
    /**
     * Calls function based on the value passed in.
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
     * Tests the value passed & creates number groups or passes any operators (+, -, /, *, =) to the operators function.
     * @param value
     */
    self.addToEquation = function(value){
        var val = value;
        var valObject = {};

        //check if the value is a number, operator, decimal, or +/-
        if(isNaN(val)){
            valObject.type = "number";
            switch (val){
                //TODO: only allow one decimal to be inputted
                case "decimal":
                    if(lastPressed.length > 0){
                        if(lastPressed.indexOf('.') > 0) {
                            //prevent multiple decimals from being added
                            return;
                        }else {
                            lastPressed += ".";
                            valObject.value = lastPressed;
                            equationArray[equationArray.length - 1] = valObject;
                        }
                    }else{
                        lastPressed += "0.";
                        valObject.value = lastPressed;
                        equationArray.push(valObject);
                    }
                    break;
                case "negate": // +/-
                    //Change sign (positive or negative) for either current stored number or solution
                    //TODO: if only +/- pressed over & over, - stays on display need to pass empty value
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
                default:
                    lastPressed = "";
                    //plus, minus, divide, multiply, equals
                    self.operators(valObject, val);
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
        self.fun(valObject.type, valObject.value);
    }; //end addToEquation function

    //determine the value of the operator
    self.operators = function(object, value){
        object.type = "operator";
        //prevent operator from being the first value stored & for two operators being entered consecutively
        if(equationArray.length < 1){
            //TODO: prevent undefined from returning to equation display
            return;
        }else if(value == "equals"){ //equals button pressed
            //object.value = "=";
            equationArray[0] = self.equals(object);
            object.type = "equalSign";
            console.log("equals");
            return object;
        } else if(equationArray.length == 3){ //array holds 2 numbers & 1 operator, & 2nd operator (besides equals) pressed
            //solve the currently stored equation
            equationArray[0] = self.equals(object);
        }

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
            default:
                console.log("Unknown operator: " + value);
        }

        if (equationArray[equationArray.length - 1].type == "operator"){
            equationArray[equationArray.length - 1] = object;
        }else{
            equationArray.push(object);
        }
    };

    //solve equation function, checks the operand pressed and solves the equation of the first two values stored( 1 +
    // 3), does not take into account order of operations as numbers are equated as entered, Returns solved equation
    self.equals = function (object){
        object.type = "number";
        switch (equationArray[1].value) {
            case "+":
                object.value = parseFloat(equationArray[0].value) + parseFloat(equationArray[2].value);
                console.log(object.value);
                break;
            case "-":
                object.value = parseFloat(equationArray[0].value) - parseFloat(equationArray[2].value);
                break;
            case "/":
                object.value = parseFloat(equationArray[0].value) / parseFloat(equationArray[2].value);
                break;
            case "*":
                object.value = parseFloat(equationArray[0].value) * parseFloat(equationArray[2].value);
                break;
            default:
                console.log("Unknown operator: " + value);
        }
        equationArray = [];
        //return object;
    };

    // clear all of the values from array & clear display
    self.clearAll = function(){
        $("#numberDisplay").text("");
        $("#equationDisplay").text("");
        equation = "";
        equationArray = [];
        lastPressed = "";
    };

    // clear last inputted button group or operator from array, number display, & equation display
    self.clear = function(){
        $("#numberDisplay").text("");
        //TODO: how to clear last entered item from equation display.
        equationArray.pop();
        lastPressed = "";
    };



}; //END calculator object











