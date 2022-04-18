

$(document).ready(function() {

    $(".container .quizQuestion").text(quizQ["question"])

    let new_div = $(`
            <img src="${quizQ["img"]}" alt="${quizQ["type"]} picture" class = "pic1">`);
            $(".photo").append(new_div);

    for(let i=0; i<quizQ["answers"].length; i++){
        let radioBtn = $('<input type="radio" value=' + i +' name="rbtnCount" /> <label>' + quizQ["answers"][i] + ' </label>');
        $(".quizAnswers").append(radioBtn)

    }


    $("#next").click(function(){
        let selected = $("input[type='radio']:checked").val()
        let ans;
        if(selected == quizQ["correct"]){
            alert("answer correct!")
            ans = "correct"
        }else{
            alert("answer incorrect. correct answer is " + quizQ["answers"][quizQ['correct']])
            ans = "incorrect"
        }

        let data_to_save = {"res" : ans,
                            "type" : quizQ["type"]
        }

        $.ajax({
            type: "POST",
            url: "/quiz/" + quizQ["id"],
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(data_to_save),
            success: function(result){
                console.log(result)

            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });

        // to next page
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

