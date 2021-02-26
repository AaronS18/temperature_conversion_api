const tempUtil  = require('temperature-util');

let temperatureTypes = new Map([
    ["f","fahrenheit"], 
    ["c","celsius"], 
    ["k","kelvin"],
    ["r", "rankine"]
]);
  

const getAnswer = (workSheetQuestions) => {
    workSheetQuestions.forEach(element => {
        // we need to round the values to the ones place
        let value, fromTemp, toTemp, studentResponse, validation;
        try{
            value = Math.round(element.profValue);
            studentResponse = Math.round(element.studentResponse);
            // validate if values are numerical
            if (isNaN(value) || isNaN(studentResponse)){
                throw "not Number"
            }
            fromTemp = element.fromTemp.toLowerCase();
            toTemp = element.toTemp.toLowerCase();
            // validate if values are from desired temperatures
            if (temperatureTypes.has(fromTemp) && temperatureTypes.has(toTemp)){
                fromTemp = temperatureTypes.get(element.fromTemp);
                toTemp = temperatureTypes.get(element.toTemp);
            } else {
                throw "not correct Temperature"
            }

            // if everything passes we calculate temp and validate prof vs student response
            validation = tempUtil.convertTemperature(value, fromTemp, toTemp);

            if (validation == studentResponse){
                element.answer = "correct";
            } else {
                element.answer = "incorrect";
            }
        } catch (error) {
            element.answer = "invalid"
        }
    });
    
}

const printWorkSheet = (workSheetQuestions, worksheetData) => {
    console.table(worksheetData)
    console.table(workSheetQuestions);
}

exports.getAnswer = getAnswer;
exports.printWorkSheet = printWorkSheet;