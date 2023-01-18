document.addEventListener('DOMContentLoaded', () => {
    
    function mathRound(someNumber, roundBy){
        let result = Math.round((someNumber*(Math.pow(10, roundBy))))/(Math.pow(10, roundBy));
        return result;
    }

    function calcBacsReportDate(reportDate){
        reportDate = new Date(reportDate);
        let userYear = new Date(reportDate).getFullYear();
        let bacsYear = new Date(reportDate).getFullYear().toString().substring(2);
        let yearForCalc = new Date(userYear+'/01/01');
        let daysFromYearStart = Math.round((Math.abs((reportDate - yearForCalc) / (1000*60*60*24)) +1));
        let bacsReportDate = '';
        
        if(daysFromYearStart < 10){
            bacsReportDate = bacsYear + '00' + daysFromYearStart;
        } else if (daysFromYearStart < 100){
            bacsReportDate = bacsYear + '0' + daysFromYearStart;
        } else {
            bacsReportDate = bacsYear + daysFromYearStart;
        }

        document.write('For BACS reporting date use: ' + bacsReportDate);
		setTimeout(() => { window.location.reload(true); }, 300000);
        return;
    }

    document.getElementById("reportDate").addEventListener("change", function() {
        calcBacsReportDate(this.value);
    });



    function splitLightFittings(distance){
        document.write('Distance is: ' + distance + '<br><br>')
        const magicThirdsRatio = distance *(3/16);
        const halfDistance = distance / 2;
        const listLength = 15;
        document.write('My magic thirds ratio (3/16): ' + magicThirdsRatio + ' || ' + halfDistance + ' || ' + (magicThirdsRatio + halfDistance) + '<br>')
        document.write('Or Plus/Minus halfway: ' + (halfDistance - magicThirdsRatio) + '<br><br>')
        for (i = 2; i <= listLength; i++){
            let splitDistance = distance / i;
            document.write(i + ' Split: ' + mathRound(splitDistance,2) + ' Edges: ' + mathRound((splitDistance/2),2) +'<br>');
        }
		setTimeout(() => { window.location.reload(true); }, 120000);
        return;
    }

    document.getElementById("splitLightFitting").addEventListener("change", function() {
        splitLightFittings(this.value);
    });

    function fibSequence(startValue, noOfValues){
        console.log(startValue, noOfValues);
        var outputValue = startValue;
        var nMinus1 = startValue - 1;
        var nMinus2 = startValue - 2;
        for (i = 0; i <= noOfValues; i++){
            if (outputValue == 1 | outputValue == 2) {
                console.log('1');
                outputValue = outputValue + 1;
            } else {
                outputValue = nMinus1 + nMinus2;
                console.log(outputValue);
                nMinus2 = nMinus1;
                nMinus1 = outputValue;
            }
        }
    }

    document.getElementById("fibSequenceLength").addEventListener("change", function() {
        fibSequence(fibSequenceStart.value, this.value);
    })

    function coffeeWaterRatio (coffeeRatio, coffeeMass) {
        console.log(coffeeRatio, coffeeMass);
        const waterMass = coffeeRatio * coffeeMass;
        document.write('<h2>Coffee</h2><br>For a 1:' + coffeeRatio + ' Ratio with ' + coffeeMass + 'g coffee<br>You will need ' + waterMass + ' grams of water<br>');
    }

    document.getElementById("coffeeMass").addEventListener("change", function() {
        coffeeWaterRatio (coffeeRatio.value, coffeeMass.value);
    })

    function calculatePasswordEntropy (password) {
        const passwordArray = password.split("")
        const regExp_az = /[a-z]/
        const regExp_AZ = /[A-Z]/
        const regExp_digits = /[0-9]/
        const regExp_special = /[^a-z^A-Z^0-9]]/
        let lowerCaseLatinPool=26
        let upperCaseLatinPool=26
        let digitsPool=10
        let specialPool=32
        var lowerCaseLatinCount=0
        var upperCaseLatinCount=0
        var digitsCount=0
        var specialCount=0
        let totalPool=0
        let passwordEntropy = 0
        let guessesRequired = 0
        let smallGuessCount = 1000
        let mediumGuessCount = 100000000000
        let largeGuessCount = 100000000000000
        let passwordStrength = ''

        for(i=0; i < passwordArray.length; i++) {
            if (passwordArray[i].match(regExp_az)) {
                lowerCaseLatinCount++
            }
            else if (passwordArray[i].match(regExp_AZ)) {
                upperCaseLatinCount++
            }
            else if (passwordArray[i].match(regExp_digits)) {
                digitsCount++
            }
            else specialCount++
        }
        
        if(lowerCaseLatinCount > 0) totalPool += lowerCaseLatinPool
        if(upperCaseLatinCount > 0) totalPool += upperCaseLatinPool
        if(digitsCount > 0) totalPool += digitsPool
        if(specialCount > 0) totalPool += specialPool
        
        passwordEntropy = passwordArray.length * Math.log2(totalPool)
        passwordEntropyRounded = mathRound(passwordEntropy,3)
        guessesRequired = mathRound(Math.pow(2, passwordEntropy), 0)

        if (passwordEntropy<10) {
            passwordStrength = "YOU'VE ALREADY BEEN HACKED"
        } else if(passwordEntropy<15){
            passwordStrength = 'VERY POOR'
        } else if(passwordEntropy<25) {
            passwordStrength = 'POOR'
        } else if(passwordEntropy<50) {
            passwordStrength = 'WEAK'
        } else if(passwordEntropy<75) {
            passwordStrength = 'MEDIUM'
        } else if(passwordEntropy<100){
            passwordStrength = 'GOOD'
        } else if(passwordEntropy<150){
            passwordStrength = 'VERY STRONG'
        } else if(passwordEntropy<200){
            passwordStrength = 'VERY VERY STRONG'
        } else passwordStrength = 'CRAZY STRONG'


     /*   console.log(password);
        console.log(passwordArray);
        console.log(lowerCaseLatinCount, upperCaseLatinCount, digitsCount, specialCount, totalPool);
        console.log("Password Entropy: " + passwordEntropy)
    */
        document.write('Password Contains <br> ' + lowerCaseLatinCount + ' a-z characters <br> ' + upperCaseLatinCount + ' A-Z characters <br> ' + digitsCount + ' 0-9 <br> ' + specialCount + ' Special characters<br><br> Password length is ' + passwordArray.length + '<br>The size of the character pool is:  ' + totalPool + '<br><h2>Password Entropy is: ' + passwordEntropyRounded + '</h2><h2>The password strength is: '+ passwordStrength + '</h2> This would require approx ' + guessesRequired + ' guesses <br><br>At '+ smallGuessCount + ' guesses per second this would take approximately <br>' + mathRound(guessesRequired / smallGuessCount,0) + ' Seconds to crack<br>' +  mathRound(guessesRequired / (smallGuessCount * 86400),1) + ' Days to crack<br>' + mathRound(guessesRequired / (smallGuessCount * 86400 * 365),2) + ' Years to crack<br>' + mathRound(guessesRequired / (smallGuessCount * 86400 * 365 * 10),2) + ' Decades to crack<br><br>At '+ mediumGuessCount + ' guesses per second this would take approximately <br>' + mathRound(guessesRequired / mediumGuessCount,0) + ' Seconds to crack<br>' +  mathRound(guessesRequired / (mediumGuessCount * 86400),1) + ' Days to crack<br>' + mathRound(guessesRequired / (mediumGuessCount * 86400 * 365),2) + ' Years to crack<br>' + mathRound(guessesRequired / (mediumGuessCount * 86400 * 365 * 10),2) + ' Decades to crack<br><br>At '+ largeGuessCount + ' guesses per second this would take approximately <br>' + mathRound(guessesRequired / largeGuessCount,0) + ' Seconds to crack<br>' +  mathRound(guessesRequired / (largeGuessCount * 86400),1) + ' Days to crack<br>' + mathRound(guessesRequired / (largeGuessCount * 86400 * 365),2) + ' Years to crack<br>' + mathRound(guessesRequired / (largeGuessCount * 86400 * 365 * 10),2) + ' Decades to crack<br>');
        
    }

    document.getElementById("passwordForCalculation").addEventListener("change", function() {
        calculatePasswordEntropy (passwordForCalculation.value);
    })


})