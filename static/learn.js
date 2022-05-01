

$(document).ready(function() {

    let startDate = new Date();

    $(".container .learnNoteType").text(learnQ["type"])
    $(".container .learnNoteInfo .info").text(learnQ["info"])

    let new_div = $(`
            <img src="${learnQ["img2"]}" alt="${learnQ["type"]} picture" class = "pic2">
            `);
            $(".image").append(new_div);

    $("#next").click(function(){
        let curr = window.location.pathname.split("/").pop()

        let endDate = new Date();
        let elapsedTime = endDate.getTime() - startDate.getTime();
        let data_to_save = {"note" : curr,
                            "time" : elapsedTime}

        $.ajax({
            type: "POST",
            url: "/learn/" + learnQ["id"],
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

        let curr_int = parseInt(curr)
            curr_int += 1
        const parent_path = window.location.origin;
        if(curr_int > 5){
            window.location.replace(parent_path+'/quiz/'+encodeURIComponent(1))
        }else{
            window.location.replace(parent_path+'/learn/'+encodeURIComponent(curr_int))
        }
    })

    $("#previous").click(function(){
        let curr = window.location.pathname.split("/").pop()

        let endDate = new Date();
        let elapsedTime = endDate.getTime() - startDate.getTime();
        let data_to_save = {"note" : curr,
                            "time" : elapsedTime}

        $.ajax({
            type: "POST",
            url: "/learn/" + learnQ["id"],
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

        
        let curr_int = parseInt(curr)
            curr_int -= 1
        const parent_path = window.location.origin;
        if(curr_int < 1){
            window.location.replace(parent_path+'/learn/'+encodeURIComponent(1))
        }else{
            window.location.replace(parent_path+'/learn/'+encodeURIComponent(curr_int))
        }
    })

    

});


