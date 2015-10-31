
//called(type, value, item)
var calculator = function(called){
    var self = this;
    self.fun = called;
    self.addItem = function(){
        //what is the value of the button pressed
        //is it a number

        //is it a decimal

        //is it an operator

        //is it +/- (positive or negative)

        //is it equals

        //pass the output to called function
        self.fun.call(self, "", "calculate");
    }






}; //end calculator object