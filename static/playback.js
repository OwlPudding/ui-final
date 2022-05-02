const NOTE_SIZE  = 60;
const SPACE_SIZE = 80; // 120 og
const noteVals = {
  'w': {
    img: "/static/img/whole.png",
    space: (4 * SPACE_SIZE) + (3 * NOTE_SIZE),
  },
  'h': {
    img: "/static/img/half.png",
    space: (2 * SPACE_SIZE) + NOTE_SIZE,
  },
  'q': {
    img: "/static/img/quarter.png",
    space: SPACE_SIZE,
  },
  'e': {
    img: "/static/img/eighth.png",
    space: (1/10) * NOTE_SIZE,
  }
};


function bpmToMS(bpm) {
  return (60 / bpm) * 1000;
}
$(document).ready(function() {
  const line = $("#line");
  const notes = $("#notes");
  const countdown  = $("#countdown");
  const playButton = $("#play");
  const replayButton = $("#replay");
  const statusMessage = $("#status-message");
  const noteCounter = $("#note-count");
  const spacebarIcon = $("#spacebar-icon");
  const noteCounterScore = $("#note-count-score");

  const linePos = line.offset();
  linePos.right = linePos.left + line.width();

  const originalNotesPos = notes.css("left");
  const pattern = learnQ.pattern;

  function insertMeasure(measure) {
    measure.forEach(function (l, i) {
      const note = noteVals[l];
      notes.append($(`<img class="note" id="note-${i}" src="${note.img}" style="margin-right: ${note.space}px"/>`));
    });
  }

  insertMeasure(pattern.measures[0]);
  let noteCount = 0;
  let score = 0;
  noteCounter.html(score);
  noteCounterScore.html(pattern.measures[0].length);

  function animateStatus(message, good) {
    statusMessage.show();
    statusMessage.css({ color: good ? "#00d300" : "#ff4141" });
    statusMessage.html(message);
    statusMessage.fadeOut(300);
  }

  function detectCollisions() {
    $(document.body).keypress(function(e) {
      if (e.keyCode == 32) {
        if (noteCount < pattern.measures[0].length) {
          const qNote = $(`#note-${noteCount}`);
          const pos = qNote.offset();
          pos.right = pos.left + NOTE_SIZE;
          if (pos.left <= linePos.left && pos.right >= linePos.right) {
            animateStatus("GOOD!", true);
            score++;
            noteCounter.html(score);
          } else {
            animateStatus("MISS!", false);
          }
          noteCount++;
        }
      }
    });
  }

  function startCountdown(delay) {
    let x = 4;
    countdown.html(x);
    let intervalID = window.setInterval(function () {
      if (x-- === 1) {
        window.clearInterval(intervalID);
        countdown.css("opacity", 0);
        $("#next").removeClass("disabled-button");
      } else {
        countdown.html(x);
      }
    }, delay);
  }

  function mainSequence() {
    noteCount = 0;
    score = 0;
    noteCounter.html(score);
    const audio = new Audio(track);
    audio.play();
    let animateTimeout = setTimeout(function () {
      notes.animate({ left: "-200px" }, pattern.duration, 'linear', function() {
        $(document.body).unbind("keypress");
        playButton.remove();
        countdown.html("");
        countdown.css("opacity", 1);
        replayButton.css("display", "initial");
      });
      detectCollisions();
      window.clearTimeout(animateTimeout);
    }, pattern.start);
    startCountdown(pattern.countdownDelay);
    replayButton.css("display", "none");
    playButton.remove();
  }

  replayButton.click(function() {
    notes.css("left", originalNotesPos);
    mainSequence();
  });
  playButton.click(mainSequence);
});
