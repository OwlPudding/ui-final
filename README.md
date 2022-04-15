# Learning Rhythmic Patterns 

## Notes
- Learn route: bootstrap is in place, need to add images to the list in server.py. 
- Quiz route: copy over structure from learn and that should work. 


## Things to consider 
- when quizzing, does each question always have the same 4 answers? basically how to we want to format our data in server.py
    {
        "id": 1,
        "type": "whole",
        "question": "what type of note is this?",
        "answers" : ["whole", "half", "quarter", "eighth"],
        "correct" : 0, # can also have this be whole instead of the correct index
    }
- clicking a tab in the navbar automatically starts at /1, whereas clicking a button on the homepage starts at /random. we can switch either of these so the quiz/practice isn't always in the same order. I don't know how to make navbar /random though... 
    
    
## TODO 
- i can do the back end users' choice storage for the quiz + figure out something to store for learning - ashley
- quiz ending page displaying # correct
