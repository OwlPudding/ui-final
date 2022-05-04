const NOTE_SIZE  = 60;
const SPACE_SIZE = 80; // 120 og
const noteSpace = {
    'w': {
        name: "whole",
        space: (4 * SPACE_SIZE) + (3 * NOTE_SIZE),
    },
    'h': {
        name: "half",
        space: (2 * SPACE_SIZE) + NOTE_SIZE,
    },
    'q': {
        name: "quarter",
        space: SPACE_SIZE,
    },
    'e': {
        name: "eighth",
        space: (1/10) * NOTE_SIZE,
    }
};
$(document).ready(function() {
    const dragNDrop = $('#drag-n-drop');
    let ansHandler;

    if (quizQ.type == "drag") {
        const trackContainer = $('#track-container');
        const trackText      = $('#track-text');
        const noteCanvas     = $('#note-canvas');
        const notes          = $('#note-canvas #notes');
        const audioElem      = $(`
            <audio controls src="/static/tracks/${quizQ.track}">
                Your browser does not support the <code>audio</code> element
            </audio>
        `);
       trackContainer.append(audioElem);

       let played = false;
       audioElem.on('ended', function(e) {
           if (!played) {
            trackContainer.removeClass("first");
            trackText.html("listen again");
            trackText.css("font-weight", "normal");
            $("#score").removeClass("hidden");
            $("#note-zone-container").removeClass("hidden");
            played = true;
           }
       });

       // DRAGGABLE NOTES FROM CONTAINER
       $('.drag-note').draggable({
           helper: "clone",
           start: function(e, ui) {
                ui.helper.attr("id", ui.helper.prevObject.attr("id"));
           }
        });
       noteCanvas.droppable({
           accept: ".drag-note",
           drop: function(e, ui) {
               const newNote = ui.draggable.clone();
               newNote.css("margin-right", noteSpace[newNote.attr("id")].space);
               notes.append(newNote);
           }
       });

       // DELETE NOTES FROM CANVAS
       notes.click(function(e) {
           $(e.target).remove();
       });

       ansHandler = function() {
           let correct = true;
           const userNotes = Array.from($("#notes").children());
            if (userNotes.length === 0) {
                correct = false;
            } else {
                for (let i = 0; i < userNotes.length; i++) {
                    if ($(userNotes[i]).attr('id') != quizQ.correct[i]) {
                        correct = false;
                        break;
                    }
                }
            }
            
            if (correct) {
                return "correct";
            } else {
                //     alert(`answer incorrect! the correct answer was: ${quizQ["correct"].map(function(n) {
                //     return noteSpace[n].name;
                // }).join(", ")}`);
                return "incorrect";
            }
       }
    } else {
        dragNDrop.remove();
        $(".container .quizQuestion").text(quizQ["question"])

        let new_div = $(`
                <img src="${quizQ["img"]}" alt="${quizQ["type"]} picture" class = "pic1">`);
                $(".photo").append(new_div);

        for(let i=0; i<quizQ["answers"].length; i++){
            let radioBtn = $('<input type="radio" value=' + i +' name="rbtnCount" /> <label class = "quizchoice" >' + quizQ["answers"][i] + ' </label>');
            $(".quizAnswers").append(radioBtn)

        }

        ansHandler = function() {
            let selected = $("input[type='radio']:checked").val();
            if(selected == quizQ["correct"]){
                return "correct";
            }else{
                return "incorrect";
            }
        };
    }

    let path = this.pathname || window.location.pathname;
    let part = path.split('/').pop();

    $("#next").click(function(){
        let data_to_save = {"res" : ansHandler(),
                            "type" : quizQ["type"],
                            "number" : part,
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
                console.log(request);
                console.log(status);
                console.log(error);
            }
        });

        // to next page
        let curr = window.location.pathname.split("/").pop();
        let curr_int = parseInt(curr);
            curr_int += 1;
        const parent_path = window.location.origin;
        if(curr_int > 10){
            window.location.replace(parent_path+'/endpage');
        }else{
            window.location.replace(parent_path+'/quiz/'+encodeURIComponent(curr_int));
        }
    });
});

