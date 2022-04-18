

$(document).ready(function() {

    $(".container .quizQuestion").text(quizQ["question"])

    let new_div = $(`
            <img src="${quizQ["img"]}" alt="${quizQ["type"]} picture" class = "pic1">`);
            $(".photo").append(new_div);

    for(let i=0; i<quizQ["answers"].length; i++){
        let radioBtn = $('<input type="radio" id=i name="rbtnCount" /> <label>' + quizQ["answers"][i] + ' </label>');
        $(".answers").append(radioBtn)

    }


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

