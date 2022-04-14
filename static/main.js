

$(document).ready(function() {

    $("#learnBtn").click(function(){
        let random_id = Math.floor(Math.random() * 3) + 1;
        const parent_path = window.location.origin;
        window.location.replace(parent_path+'/learn/'+encodeURIComponent(random_id))
    })

    $("#quizBtn").click(function(){
        let random_id = Math.floor(Math.random() * 3) + 1;
        const parent_path = window.location.origin;
        window.location.replace(parent_path+'/quiz/'+encodeURIComponent(random_id))
    })

})