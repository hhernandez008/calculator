//Calculator Object
//called(type, value, item)
var calculator = function(called){
    var self = this;
    var error = false;
    //Array to hold current equation
    self.equationArray = [];
    //store past equations
    self.calcMemory = [];
    //What was the last number entered (stored as string)?
    self.lastNumber = "";

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
                    if(self.lastNumber.length > 0){
                        if(self.lastNumber.indexOf(".") > 0) {
                            //prevent multiple decimals from being added
                            return;
                        }else {
                            self.lastNumber += ".";
                            valObject.value = self.lastNumber;
                            self.equationArray[self.equationArray.length - 1] = valObject;
                        }
                    }else{
                        self.lastNumber = "0.";
                        valObject.value = self.lastNumber;
                        self.equationArray.push(valObject);
                    }
                    break;
                case "negate": // +/-
                    //Change sign (positive or negative) for either current stored number or solution
                    //TODO: if only +/- pressed over & over, - stays on display need to pass empty value
                    if(self.lastNumber.length > 0){
                        if(self.lastNumber == "-"){
                            self.lastNumber = "";
                            self.equationArray.pop();
                        }else {
                            self.lastNumber = "" + ((-1) * parseFloat(self.lastNumber));
                            valObject.value = self.lastNumber;
                            self.equationArray[self.equationArray.length - 1] = valObject;
                        }
                    }else{
                        self.lastNumber = "-";
                        valObject.value = self.lastNumber;
                        self.equationArray.push(valObject);
                    }
                    break;
                default:
                    self.lastNumber = "";
                    //plus, minus, divide, multiply, equals
                    self.operators(valObject, val);
            } //end switch(val)
        // end true, if(isNaN(val))
        }else{
            //clear array if new number is pressed after the equals sign is pressed
            if(self.equationArray != "" && self.equationArray[(self.equationArray.length-1)].type == "equalSign"){
                self.equationArray = [];
            }
            //add the number to the lastNumber variable
            self.lastNumber += val;
            valObject.value = self.lastNumber;
            //store in equationArray; overwrite last index with new number, if multiple numbers pressed before operand
            if(self.lastNumber.length > 1){
                self.equationArray[self.equationArray.length - 1] = valObject;
            } else{
                self.equationArray.push(valObject);
            }
        } //end if/else

        if (error){
            self.fun("Error", "Error");
            self.equationArray = [];
            error = false;
        }
        //pass the object type & value into the called function
        self.fun(valObject.type, valObject.value, self.calcMemory);
    }; //end addToEquation method

    /**
     * Determine the value of the operator, if equals pass to the equals method, store all others.
     * @param object
     * @param value
     */
    self.operators = function(object, value){
        object.type = "operator";
        //prevent operator from being the first value stored
        if(self.equationArray.length < 1){
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
                self.equationArray[0] = object;
                object.type = "equalSign";
                return;
        }

        if(self.equationArray.length == 3){
            //array holds 2 numbers & 1 operator, if 2nd operator (besides equals) pressed solve the current array
            var calculatedObject = {};
            self.equals(calculatedObject);
            self.equationArray.push(object);
        } else if(self.equationArray[self.equationArray.length - 1].type == "operator"){
            //prevent operators from being stored consecutively, last operator pressed stored
            self.equationArray[self.equationArray.length - 1] = object;
        }else{
            self.equationArray.push(object);
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
        if (self.equationArray.length < 3) {
            if (self.equationArray.length === 1 && self.equationArray[0].type === "equalSign") {
                var repeatOperator = {
                    //operator from index 0's history
                    type: self.equationArray[0].history[1].type,
                    value: self.equationArray[0].history[1].value
                };
                var repeatOperand = {
                    //second operand from index 0's history
                    type: self.equationArray[0].history[2].type,
                    value: self.equationArray[0].history[2].value
                };
                self.equationArray.push(repeatOperator, repeatOperand);
                return self.equals(object);

            } else if (self.equationArray.length === 1){
                object.value = self.equationArray[0].value;
            } else if (self.equationArray.length === 2) {
                object.value = self.equationArray[0].value;
                self.equationArray.push(object);
                self.equals(object);
            } else {
                return;
            }
        }else{
            switch (self.equationArray[1].value) {
                case "+":
                    object.history = [self.equationArray[0], self.equationArray[1], self.equationArray[2]];
                    object.value = parseFloat(self.equationArray[0].value) + parseFloat(self.equationArray[2].value);
                    self.pastEquList();
                    break;
                case "-":
                    object.history = [self.equationArray[0], self.equationArray[1], self.equationArray[2]];
                    object.value = parseFloat(self.equationArray[0].value) - parseFloat(self.equationArray[2].value);
                    self.pastEquList();
                    break;
                case "/":
                    //error if divide by zero
                    if (parseFloat(self.equationArray[2].value) == 0) {
                        object.type = "error";
                        object.value = "Error";
                        error = true;
                        return;
                    } else {
                        object.history = [self.equationArray[0], self.equationArray[1], self.equationArray[2]];
                        object.value = parseFloat(self.equationArray[0].value) / parseFloat(self.equationArray[2].value);
                        self.pastEquList();
                    }
                    break;
                case "*":
                    object.history = [self.equationArray[0], self.equationArray[1], self.equationArray[2]];
                    object.value = parseFloat(self.equationArray[0].value) * parseFloat(self.equationArray[2].value);
                    self.pastEquList();
                    break;
                default:
                    console.log("Unknown operator: " + value);
            }
        }
        self.equationArray = [];
        self.equationArray.push(object);
        return object.value;
    }; //end equals method


    /**
     *
     */
     //Page can display up to 12 equations
    self.pastEquList = function(){
        self.calcMemory.push(self.equationArray[0].value + self.equationArray[1].value + self.equationArray[2].value);


        if(self.calcMemory.length > 12){
            var size = self.calcMemory.length;
            //trim calcMemory down to 12 indexes, keep the newest indexes
            self.calcMemory.splice(0,(size-12));
        }
    };


    /**
     * Clear all of the values held in the array, lastNumber, & clear display
     */
    self.clearAll = function(){
        $("#number").text("0");
        $("#operator").text("\xA0"); //non-breaking space with unicode literal
        equation = "";
        self.equationArray = [];
        self.lastNumber = "";
    };

    /**
     * Clear lastNumber or operator from array, number display, & equation display
     */
    self.clear = function(){
        $("#number").text("0");
        self.equationArray.pop();
        self.lastNumber = "";
    };


}; //END calculator object











