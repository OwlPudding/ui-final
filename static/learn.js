

$(document).ready(function() {

    $(".container .learnNoteType").text(learnQ["type"])
    $(".container .learnNoteInfo .info").text(learnQ["info"])

    $("#next").click(function(){
    let curr = window.location.pathname.split("/").pop()
    let curr_int = parseInt(curr)
        curr_int += 1
    const parent_path = window.location.origin;
    window.location.replace(parent_path+'/learn/'+encodeURIComponent(curr_int))
    })

});

