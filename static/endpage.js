$(document).ready(function() {

    console.log(JSON.stringify(QUIZ_RESULTS))
    let right = 0;
    let wrong = 0;
    let drag = 0;
    let quarter = 0;
    let half = 0;
    let whole = 0;
    let incorrect = [];
    for(let i=0; i<QUIZ_RESULTS.length; i++){
        console.log(QUIZ_RESULTS[i]["res"])
        if(QUIZ_RESULTS[i]["res"] == "correct"){
            right++
        }else if(QUIZ_RESULTS[i]["res"] == "incorrect"){
            incorrect.push(QUIZ_RESULTS[i]["number"])
            wrong++
        }

        if(QUIZ_RESULTS[i]["type"] == "drag"){
            drag++
        }else if(QUIZ_RESULTS[i]["type"] == "whole"){
            whole++
        }else if(QUIZ_RESULTS[i]["type"] == "quarter"){
            quarter++
        }else if(QUIZ_RESULTS[i]["type"] == "half"){
            half++
        }
    }

    // for most common type of question wrong
    let types = {drag, whole, quarter, half}
    let maxVal = Math.max(...Object.values(types))
    let key = Object.keys(types).find(key => types[key] === maxVal)


    let max = 0;
    let min = Infinity;
    let max_note = 0;
    let min_note = 0;
    let time = [0, 0, 0, 0, 0]
    let names = ["whole", "half", "quarter", "eighth", "sixteenth"]

    for(let i=0; i<LEARN_TIME.length; i++){
        time[LEARN_TIME[i]["note"] - 1] = LEARN_TIME[i]["time"]
    }
    for(let i=0; i<5; i++){
        if(time[i] > max){
            max = time[i]
            max_note = i
        }
        if(time[i] < min){
            min = time[i]
            min_note = i
        }
    }


    $(".container .resultScore").text("Score: " + right + "/10" )

    $(".container .incorrectQuestions").append("Incorrect Questions: ")
    $(".container .incorrectQuestions").append(incorrect.join(", "))


    $(".container .toReview").append("Topic to Review: " + key)

    $(".container .learnedTime").text("You Learned " + names[max_note] + " notes for the longest and " + names[min_note] + " notes for the shortest.")




    // reset quiz results

     $.ajax({
            type: "POST",
            url: "/endpage",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(QUIZ_RESULTS),
            success: function(result){
                console.log(result)

            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request);
                console.log(status);
                console.log(error);
            }
        });


});