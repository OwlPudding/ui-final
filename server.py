from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

app = Flask(__name__)

# we can also split questions into quarter =[], half=[], making it easier to learn a specific type of note
# then for learn/quiz, just randomly pull questions from each list
# that makes the learn path a bit more complicated though

LEARN_QUESTIONS = [
    {
        "id": 1,
        "type": "WHOLE NOTE",
        "img1": "https://pianomusictheory.files.wordpress.com/2016/05/whole_note.png",
        "img2": "https://www.skoove.com/blog/wp-content/uploads/2019/08/image9.png",
        "info": "4 beats. The whole note has a note head in the shape of a hollow oval but with no note stem. Since it is equal to four quarter notes, it occupies the entire length of a measure in 4/4 time.",
        "pattern": {
            "track": "1mw.mp3",
            "measures": [
                ['w']
            ],
            "start": 2200,  # 2456
            "duration": 2303,  # 2403
            "countdownDelay": 575,
        },
    },
    {
        "id": 2,
        "type": "HALF NOTE",
        "img1": "https://qph.fs.quoracdn.net/main-qimg-dc7b3d45c40cdae873068b14187077e7",
        "img2": "https://www.skoove.com/blog/wp-content/uploads/2019/08/image3.png",
        "info": "2 beats. half the duration of a whole note. notated with a hollow oval notehead like a whole note and straight note stem with no flags like a quarter note.",
        "pattern": {
            "track": "1mhh.mp3",
            "measures": [
                ['h', 'h']
            ],
            "start": 2200,  # 2457,
            "duration": 2303,  # 1845,
            "countdownDelay": 575,
        },
    },
    {
        "id": 3,
        "type": "QUARTER NOTE",
        "img1": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Quarter_notes_and_rest.svg/1200px-Quarter_notes_and_rest.svg.png",
        "img2": "https://www.skoove.com/blog/wp-content/uploads/2019/08/image1.png",
        "info": "1 beat. one quarter of the duration of a whole note. notated with a filled-in oval note head and a straight, flagless stem. the stem can either go up or down.",
        "pattern": {
            "track": "1mq.mp3",
            "measures": [
                ['q', 'q', 'q', 'q']
            ],
            "start": 2200,  # 2456
            "duration": 2303,  # 2403
            "countdownDelay": 575,
        },
    },
    {
        "id": 4,
        "type": "EIGHTH NOTE",
        "img1": "https://i1.wp.com/www.thenewdrummer.com/wp-content/uploads/2017/11/What-is-the-Eighth-Note-300x150.png?resize=300%2C150",
        "img2": "https://press.rebus.community/app/uploads/sites/81/2017/07/how-to-count.png",
        "info": "1/2 beat. one eighth the duration of a whole note. notated with an oval, filled-in note head and a straight note stem with one note flag.",
        "pattern": {
            "track": "1me.mp3",
            "measures": [
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
            ],
            "start": 2225,  # 2456
            "duration": 2925,  # 2403, #2303, #2403
            "countdownDelay": 625,
        },
    },
]

QUIZ_QUESTIONS = [
    {
        "id": 1,
        "type": "drag",
        "track": "quiz/1meeq.mp3",
        "correct": ['e', 'e', 'q', 'e', 'e', 'q'],
    },
    {
        "id": 2,
        "type": "whole",
        "question": "what type of note is this?",
        "img": "https://pianomusictheory.files.wordpress.com/2016/05/whole_note.png",
        "answers": ["whole", "half", "quarter", "eighth"],
        "correct": 0,
    },
    {
        "id": 3,
        "type": "quarter",
        "question": "what type of note is this?",
        "img": "https://www.musictheoryacademy.com/wp-content/uploads/2020/06/Music-Theory-Beginners-Quiz-quarter-note.jpg",
        "answers": ["whole", "half", "quarter", "eighth"],
        "correct": 2,
    },
    {
        "id": 4,
        "type": "quarter",
        "question": "what type of note is the first note?",
        "img": "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/d6a1f5df-b2ef-4d72-beba-6e5850795aa8",
        "answers": ["whole", "half", "quarter", "eighth"],
        "correct": 3,
    },
    {
        "id": 5,
        "type": "quarter",
        "question": "what type of note is the second note?",
        "img": "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/d6a1f5df-b2ef-4d72-beba-6e5850795aa8",
        "answers": ["whole", "half", "quarter", "eighth"],
        "correct": 3,
    },
    {
        "id": 6,
        "type": "quarter",
        "question": "what type of note is the third note?",
        "img": "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/d6a1f5df-b2ef-4d72-beba-6e5850795aa8",
        "answers": ["whole", "half", "quarter", "eighth"],
        "correct": 2,
    },
    {
        "id": 7,
        "type": "drag",
        "track": "quiz/eqeqee.mp3",
        "correct": ['e', 'q', 'e', 'q', 'e', 'e'],
    },
    {
        "id": 8,
        "type": "drag",
        "track": "quiz/qhee.mp3",
        "correct": ['q', 'h', 'e', 'e'],
    },
    {
        "id": 9,
        "type": "quarter",
        "question": "what type of note is the sixth note?",
        "img": "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/d6a1f5df-b2ef-4d72-beba-6e5850795aa8",
        "answers": ["whole", "half", "quarter", "eighth"],
        "correct": 3,
    },
    {
        "id": 10,
        "type": "drag",
        "track": "quiz/eehee.mp3",
        "correct": ['e', 'e', 'h', 'e', 'e'],
    },
]

LEARN_RESULTS = [

]

LEARN_TIME = [

]

QUIZ_RESULTS = [

]


# ROUTES

# HOME PAGE
@app.route('/')
def index():
    return render_template('homepage.html')


# LEARN
@app.route('/learn/<path:learn_id>', methods=['POST', 'GET'])
def learn(learn_id):
    lq = None
    if request.method == "GET":
        for question in LEARN_QUESTIONS:
            if int(question["id"]) == int(learn_id):
                lq = question
        return render_template('learn.html', learnQ=lq, LEARN_TIME=LEARN_TIME)
    else:
        print("in add entry ajax")

        json_data = request.get_json()
        LEARN_TIME.append(json_data)
        return jsonify(LEARN_TIME=LEARN_TIME)


# QUIZ
@app.route('/quiz/<path:quiz_id>', methods=['POST', 'GET'])
def quiz(quiz_id):
    if request.method == "GET":
        for q in QUIZ_QUESTIONS:
            if int(q["id"]) == int(quiz_id):
                quizQ = q
        return render_template('quiz.html', quizQ=quizQ, QUIZ_RESULTS=QUIZ_RESULTS)
    else:
        print("in post quiz")

        json_data = request.get_json()
        QUIZ_RESULTS.append(json_data)
        return jsonify(QUIZ_RESULTS=QUIZ_RESULTS)


@app.route('/endpage', methods=['POST', 'GET'])
def endpage():
    if request.method == "GET":
        return render_template('endpage.html', QUIZ_RESULTS=QUIZ_RESULTS, LEARN_TIME=LEARN_TIME)
    else:
        print("HERE")
        json_data = request.get_json()
        QUIZ_RESULTS.clear()
        json_data.clear()
        return jsonify(QUIZ_RESULTS=json_data)


if __name__ == '__main__':
    app.run(debug=True)
