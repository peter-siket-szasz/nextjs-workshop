const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

const games = [];

app.use(bodyParser.json());

// Load questions from the CSV file
const questions = [];
fs.createReadStream('./data/questions.csv')
  .pipe(csv())
  .on('data', (data) => {
    questions.push(data);
  })
  .on('end', () => {
    console.log('Questions loaded from CSV file');
  });

// API route to get all questions
app.get('/questions', (req, res) => {
  console.log(questions);
  const filtered_questions = (questions) => {
    return questions.map((question) => {
      const { Correct_Option_Id, ...questionWithoutAnswer } = question;
      return questionWithoutAnswer;
    });
  };
  res.json(filtered_questions(questions));
});


// API route to post answers
app.post('/answer', (req, res) => {
  const { question_id, selected_option_id } = req.body;

  if (!question_id || !selected_option_id) {
    res.status(400).json({ error: 'Both question_id and selected_option_id are required' });
    return;
  }

  if (question_id && selected_option_id) {
    const foundQuestion = questions.find(question => question.Question_id === question_id);
    if (foundQuestion) {
      if (foundQuestion.Correct_Option_Id === selected_option_id) {
        res.status(200).json({ correct_answer: true, message: 'Correct Answer!' });
      } else {
        res.status(200).json({ correct_answer: false, message: 'Wrong Answer!' });
      }
    } else {
      res.status(400).json({ error: 'Question not found' });
    }
  }
});

app.post('/game', (req, res) => {
  const { player_id } = req.body;
  if (!player_id) {
    res.status(400).json({ error: 'player_id is required' });
    return;
  }
  games.push({ id: games.length, players: [{ player_id, score: 0, answered: 0 }] });
  console.log(games);
  res.json({ gameId: games.length });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the app
