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
        "type": "whole note",
        "img1": "https://pianomusictheory.files.wordpress.com/2016/05/whole_note.png",
        "img2": "https://www.skoove.com/blog/wp-content/uploads/2019/08/image9.png",
        "info": "4 beats. The whole note has a note head in the shape of a hollow oval but with no note stem. Since it is equal to four quarter notes, it occupies the entire length of a measure in 4/4 time."
    },
    {
        "id": 2,
        "type": "half note",
        "img1": "https://pngset.com/images/half-half-note-music-note-icon-text-electronics-gray-symbol-transparent-png-1886606.png",
        "img2": "https://www.skoove.com/blog/wp-content/uploads/2019/08/image3.png",
        "info": "2 beats. half the duration of a whole note. notated with a hollow oval notehead like a whole note and straight note stem with no flags like a quarter note."
    },
    {
        "id": 3,
        "type": "quarter note",
        "img1": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Quarter_notes_and_rest.svg/1200px-Quarter_notes_and_rest.svg.png",
        "img2": "https://www.skoove.com/blog/wp-content/uploads/2019/08/image1.png",
        "info": "1 beat. one quarter of the duration of a whole note. notated with a filled-in oval note head and a straight, flagless stem. the stem can either go up or down."
    },
    {
        "id": 4,
        "type": "eighth note",
        "img1": "https://i1.wp.com/www.thenewdrummer.com/wp-content/uploads/2017/11/What-is-the-Eighth-Note-300x150.png?resize=300%2C150",
        "img2": "https://press.rebus.community/app/uploads/sites/81/2017/07/how-to-count.png",
        "info": "1/2 beat. one eighth the duration of a whole note. notated with an oval, filled-in note head and a straight note stem with one note flag."
    },
    {
        "id": 5,
        "type": "sixteenth note",
        "img1": "https://www.dummies.com/wp-content/uploads/104989.image2.jpg",
        "img2": "https://press.rebus.community/app/uploads/sites/81/2018/04/sixteenth-note-counting.png",
        "info": "1/4 beat. one sixteenth of the duration of a whole note. notated with an oval, filled-in note head and a straight note stem with two flags."
    },
]

QUIZ_QUESTIONS = [
    {
        "id": 1,
        "type": "whole",
        "question": "what type of note is this?",
        "img": "https://pianomusictheory.files.wordpress.com/2016/05/whole_note.png",
        "answers": ["whole", "half", "quarter", "eighth"],
        "correct": 0,
    },
    {
        "id": 2,
        "type": "quarter",
        "question": "what type of note is this?",
        "answers" : ["whole", "half", "quarter", "eighth", "sixteenth"],
        "correct" : 2,
    },
    {
        "id": 3,
        "type": "quarter",
        "question": "what type of note is this?",
        "answers" : ["whole", "half", "quarter", "eighth", "sixteenth"],
        "correct" : 1, 
    },
    {
        "id": 4,
        "type": "quarter",
        "question": "what type of note is this?",
        "answers" : ["whole", "half", "quarter", "eighth", "sixteenth"],
        "correct" : 1, 
    },
    {
        "id": 5,
        "type": "quarter",
        "question": "what type of note is this?",
        "answers" : ["whole", "half", "quarter", "eighth", "sixteenth"],
        "correct" : 1, 
    },
    {
        "id": 6,
        "type": "quarter",
        "question": "what type of note is this?",
        "answers" : ["whole", "half", "quarter", "eighth", "sixteenth"],
        "correct" : 1, 
    },
    {
        "id": 7,
        "type": "quarter",
        "question": "what type of note is this?",
        "answers" : ["whole", "half", "quarter", "eighth", "sixteenth"],
        "correct" : 1, 
    },
    {
        "id": 8,
        "type": "quarter",
        "question": "what type of note is this?",
        "answers" : ["whole", "half", "quarter", "eighth", "sixteenth"],
        "correct" : 1, 
    },
    {
        "id": 9,
        "type": "quarter",
        "question": "what type of note is this?",
        "answers" : ["whole", "half", "quarter", "eighth", "sixteenth"],
        "correct" : 1, 
    },
    {
        "id": 10,
        "type": "quarter",
        "question": "what type of note is this?",
        "answers" : ["whole", "half", "quarter", "eighth", "sixteenth"],
        "correct" : 1, 
    },
]

LEARN_RESULTS = [

]

QUIZ_RESULTS = [

]


# ROUTES

# HOME PAGE
@app.route('/')
def index():
    return render_template('homepage.html')


# LEARN
@app.route('/learn/<path:learn_id>')
def learn(learn_id):
    for question in LEARN_QUESTIONS:
        if int(question["id"]) == int(learn_id):
            learnQ = question

    return render_template('learn.html', learnQ=learnQ)


@app.route('/quiz/<path:quiz_id>', methods=['POST', 'GET'])
def quiz(quiz_id):
    if request.method == "GET":
        for q in QUIZ_QUESTIONS:
            if int(q["id"]) == int(quiz_id):
                quizQ = q
        return render_template('quiz.html', quizQ=quizQ, QUIZ_RESULTS = QUIZ_RESULTS)
    else:
        print("in add entry ajax")

        json_data = request.get_json()
        QUIZ_RESULTS.append(json_data)
        return jsonify(QUIZ_RESULTS=QUIZ_RESULTS)


@app.route('/endpage')
def endpage():
    return render_template('endpage.html', QUIZ_RESULTS = QUIZ_RESULTS)


if __name__ == '__main__':
    app.run(debug=True)
