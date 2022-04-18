$(document).ready(function() {

    console.log(JSON.stringify(QUIZ_RESULTS))
    let right = 0;
    let wrong = 0;
    for(let i=0; i<QUIZ_RESULTS.length; i++){
        console.log(QUIZ_RESULTS[i]["res"])
        if(QUIZ_RESULTS[i]["res"] == "correct"){
            right++
        }else{
            wrong++
        }
    }

    $(".container .resultScore").text("Correct: " + right + " Incorrect: " + wrong )

});