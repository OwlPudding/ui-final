

$(document).ready(function() {

    $("#learnBtn").click(function(){
        // SWITCH RANDOM TO START AT 1 IF THAT'S SOMETHING WE WANT
        let random_id = 1;
        const parent_path = window.location.origin;
        window.location.replace(parent_path+'/learn/'+encodeURIComponent(random_id))
    })

    $("#quizBtn").click(function(){
        // SWITCH RANDOM TO START AT 1 IF THAT'S SOMETHING WE WANT
        // let random_id = Math.floor(Math.random() * 3) + 1;
        let random_id = 1;
        const parent_path = window.location.origin;
        window.location.replace(parent_path+'/quiz/'+encodeURIComponent(random_id))
    })

})