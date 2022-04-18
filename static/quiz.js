

$(document).ready(function() {

    $(".question").text(quizQ["question"])

    let new_div = $(`
            <img src="${quizQ["img"]}" alt="${quizQ["type"]} picture" class = "pic1">`);
            $(".photo").append(new_div);

    for(let i=0; i<quizQ["answers"].length; i++){
        let radioBtn = $('<input type="radio" id=i name="rbtnCount" /> <label>' + quizQ["answers"][i] + ' </label>');
        $(".answers").append(radioBtn)

    }

})
