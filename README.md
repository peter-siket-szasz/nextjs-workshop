# workshop-react

## Getting started

# Backend

## Edit Questions And Answers
Question, Answers and Choices can be found in /data/questions.csv
Edit questions.csv if you want to add, remove or change questions.

### Run locally

```code
npm i
node index.js
```

### API

We have two routes:
1) GET /questions - route to get a list of all questions and answer options WITHOUT the correct option.
```json
[
    {
        "Question_id": string,
        "Question": string,
        "Option_1": string,
        "Option_2": string,
        "Option_3": string,
        "Option_4": string,
        "Correct_Option_1": string
    }
]
```
2) POST /answer - route to post question_id and selected_option_id and recieve feedback in form of
```json
{ 
    "correct_answer": boolean,
    "message": string
}
```

```code
curl --request GET \
  --url http://localhost:3000/questions
```

```code
curl --request POST \
  --url http://localhost:3000/answer \
  --header 'Content-Type: application/json' \
  --data '{
	"question_id": "2",
	"selected_option_id": "3"
}'
```

## Tests
Dependencies: 

- mocha: The testing framework.
- chai: The assertion library.
- supertest: A library for making HTTP requests in your tests.

All tests can be found in test.js

### Run tests
```code
npx mocha test.js
```