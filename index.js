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

app.get('/games', (req, res) => {
  res.json({ ids: games.map(game => game.id.toString()) });
});

app.get('/game/:id', (req, res) => {
  const gameId = parseInt(req.params.id);
  const game = findGame(gameId);
  if (game) {
    res.json(game);
  } else {
    res.status(400).json({ error: 'Game not found' });
  }
});


// API route to post answers
app.post('/answer', (req, res) => {
  const { player_id, game_id, question_id, selected_option_id } = req.body;

  if (!player_id) {
    res.status(400).json({ error: 'player_id is required' });
    return;
  }
  if (!game_id, !question_id || !selected_option_id) {
    res.status(400).json({ error: 'game_id, question_id and selected_option_id are required' });
    return;
  }

  const game = findGame(game_id);
  console.log(game);
  const player = game.players.find(player => player.player_id === player_id);
  console.log(player);
  const question = questions.find(question => parseInt(question.Question_id) === question_id);
  const playerHasQuestion = player.questions.includes(question_id);
  console.log(question);
  if (playerHasQuestion) {
    player.questions.splice(player.questions.indexOf(question_id), 1);
    if (question.Correct_Option_Id === selected_option_id) {
      player.score += 100;
    }
  } else {
    console.log('question not in list');
  };
  const nextQuestion = player.questions.length ? player.questions[0] : null;
  res.json({ nextQuestion, receivedAnswer: selected_option_id, correctAnswer: parseInt(question.Correct_Option_Id) });
});

app.post('/game', (req, res) => {
  const { player_id } = req.body;
  if (!player_id) {
    res.status(400).json({ error: 'player_id is required' });
    return;
  }
  const gameId = games.length + 1;
  const randomQuestions = generateRandomQuestionList(5);
  games.push({ id: gameId, players: [{ player_id, score: 0, questions: randomQuestions }] });
  console.log(games.map(game => `id: ${game.id}, players: ${game.players.length}, [
    ${game.players.map(player => `${player.questions.length}]`)
}`));
  res.json({ gameId: gameId, message: 'Game created with id: ' + gameId + ' for player id: ' + player_id });
});

function findGame(gameId) {
  return games.find(game => game.id === gameId);
}

function generateRandomQuestionList(n) {
  const questionList = [];
  Array.from({ length: n }).forEach(() => {
    // Later make sure no duplicates are added
    const randomIndex = Math.floor(Math.random() * questions.length);
    questionList.push(randomIndex);
  });
  return questionList;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the app
