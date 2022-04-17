

$(document).ready(function() {

    $(".container .learnNoteType").text(learnQ["type"])
    $(".container .learnNoteInfo .info").text(learnQ["info"])

    let new_div = $(`
            <img src="${learnQ["img1"]}" alt="${learnQ["type"]} picture" class = "pic1">
            <img src="${learnQ["img2"]}" alt="${learnQ["type"]} picture" class = "pic2">
            `);
            $(".image").append(new_div);

    $("#next").click(function(){
    let curr = window.location.pathname.split("/").pop()
    let curr_int = parseInt(curr)
        curr_int += 1
    const parent_path = window.location.origin;
    window.location.replace(parent_path+'/learn/'+encodeURIComponent(curr_int))
    })

});

