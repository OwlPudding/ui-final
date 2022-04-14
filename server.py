from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

app = Flask(__name__)

LEARN_QUESTIONS = [
    {
        "id": 1,
        "type": "whole",
        "question": "michael scott"
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

QUIZ_QUESTIONS = [
{
        "id": 1,
        "type": "whole",
        "question": "michael scott"
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
