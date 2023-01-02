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
        var outputValue = startValue;
        var nMinus1 = 1;
        var nMinus2 = 1;
        for (i = 1; i <= noOfValues; i++){
            if (i === 1 | i === 2) {
                console.log('1');
            } else {
                outputValue = nMinus1 + nMinus2;
                console.log(outputValue);
                nMinus2 = nMinus1
                nMinus1 = outputValue;
            }
        }
    }

    fibSequence(1,30);

})