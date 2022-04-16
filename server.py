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
        "info": "4 beats. The whole note has a note head in the shape of a hollow oval but with no note stem. Since it is equal to four quarter notes, it occupies the entire length of a measure in 4/4 time."
    },
    {
        "id": 2,
        "type": "half note",
        "info": "2 beats. half the duration of a whole note. notated with a hollow oval notehead like a whole note and straight note stem with no flags like a quarter note."
    },
    {
        "id": 3,
        "type": "quarter note",
        "info": "1 beat. one quarter of the duration of a whole note. notated with a filled-in oval note head and a straight, flagless stem. the stem can either go up or down."
    },
]

QUIZ_QUESTIONS = [
{
        "id": 1,
        "type": "whole",
        "question": "what type of note is this?",
        "answers" : ["whole", "half", "quarter", "eighth"],
        "correct" : 0, # can also have this be whole instead of the correct index
    },
    {
        "id": 2,
        "type": "quarter",
        "question": "jim halpert"
    },
    {
        "id": 3,
        "type": "quarter",
        "question": "jim halpert"
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



@app.route('/quiz/<path:quiz_id>')
def quiz(quiz_id):
    for question in QUIZ_QUESTIONS:
        if int(question["id"]) == int(quiz_id):
            quizQ = question
    return render_template('quiz.html', quizQ=quizQ)


@app.route('/hello/<name>')
def hello_name(name=None):
    return render_template('hello_name.html', name=name)


# AJAX FUNCTIONS
# ajax for people.js
@app.route('/add_name', methods=['GET', 'POST'])
def add_name():
    global data
    global current_id

    json_data = request.get_json()
    name = json_data["name"]

    # add new entry to array with 
    # a new id and the name the user sent in JSON
    current_id += 1
    new_id = current_id
    new_name_entry = {
        "name": name,
        "id": current_id
    }
    data.append(new_name_entry)

    # send back the WHOLE array of data, so the client can redisplay it
    return jsonify(data=data)


if __name__ == '__main__':
    app.run(debug=True)
