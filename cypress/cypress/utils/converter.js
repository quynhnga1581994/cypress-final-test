class Converter{
    extractAmountFromPriceString(inputString){
        // Remove non-numeric characters from the input string using regex
      const numericString = inputString.replace(/[^0-9.]/g, '');
    
      // Parse the numeric string to a floating-point number
      const numericValue = parseFloat(numericString);
    
      return numericValue;
    }
}

export default Converter