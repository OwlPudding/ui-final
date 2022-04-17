

$(document).ready(function() {

    $(".container .quizQuestion").text(quizQ["question"])
    $(".container .quizAnswers .info").text(quizQ["answers"])

    $("#next").click(function(){
    let curr = window.location.pathname.split("/").pop()
    let curr_int = parseInt(curr)
        curr_int += 1
    const parent_path = window.location.origin;
    if(curr_int > 10){
        window.location.replace(parent_path+'/endpage')
    }else{
        window.location.replace(parent_path+'/quiz/'+encodeURIComponent(curr_int))
    }
    })

});

