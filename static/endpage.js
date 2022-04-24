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

    $(".container .resultScore").text("Correct: " + right + " Incorrect: " + wrong)
    $(".container .learnedTime").text("You Learned " + names[max_note] + " notes for the longest and " + names[min_note] + " notes for the shortest.")

});