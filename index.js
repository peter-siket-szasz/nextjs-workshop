const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

/** The object structure of the app is as follows:
  Question: {
    questionId: number,
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    correctOptionId: number
  }
  Game: {
    id: number,
    players: [
      {
        playerId: number,
        score: number,
        questions: [number] // List of questionIds
      }
    ]
  }
*/

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

const games = [];


/** Helper function to find a game with given id */
function findGame(gameId) {
  return games.find(game => game.id === gameId);
}

/** Generates a list of random questions and returns them as a list */
function generateRandomQuestionList(n) {
  const questionList = [];
  Array.from({ length: n }).forEach(() => {
    // Later make sure no duplicates are added
    const randomIndex = Math.floor(Math.random() * questions.length);
    questionList.push(randomIndex);
  });
  return questionList;
}

/**  API route to get all questions */
app.get('/questions', (req, res) => {
  console.log(questions);
  const filtered_questions = (questions) => {
    return questions.map((question) => {
      const { correctOptionId, ...questionWithoutAnswer } = question;
      return questionWithoutAnswer;
    });
  };
  res.json(filtered_questions(questions));
});

/** API route to get all games */
app.get('/games', (req, res) => {
  res.json({ ids: games.map(game => game.id.toString()) });
});

/** API route to get a game by id */
app.get('/game/:id', (req, res) => {
  const gameId = parseInt(req.params.id);
  const game = findGame(gameId);
  if (game) {
    res.json(game);
  } else {
    res.status(400).json({ error: 'Game not found' });
  }
});


/** API route to post answers 
  Request body should be of the form:
  {
    playerId: string,
    gameId: number,
    questionId: number,
    answer: number
  }
  Response is of the form:
  {
    nextQuestion: number,
    receivedAnswer: number,
    correctAnswer: number
  }
*/
app.post('/answer', (req, res) => {
  const { playerId, gameId, questionId, answer } = req.body;

  if (!playerId) {
    res.status(400).json({ error: 'playerId is required' });
    return;
  }
  if (!gameId, !questionId || !answer) {
    res.status(400).json({ error: 'gameId, questionId and answer are required' });
    return;
  }

  const game = findGame(gameId);
  console.log(game);
  const player = game.players.find(player => player.playerId === playerId);
  console.log(player);
  const question = questions.find(question => parseInt(question.questionId) === questionId);
  const playerHasQuestion = player.questions.includes(questionId);
  console.log(question);
  if (playerHasQuestion) {
    player.questions.splice(player.questions.indexOf(questionId), 1);
    if (question.correctOptionId === answer) {
      player.score += 100;
    }
  } else {
    console.log('question not in list');
  };
  const nextQuestion = player.questions.length ? player.questions[0] : null;
  res.json({ nextQuestion, receivedAnswer: answer, correctAnswer: parseInt(question.correctOptionId) });
});

/** Endpoint for creating a game. Creates a game object and stores it.
  By default the requester is added to the player list.
  Request body should be of the form:
  {
    playerId: string
  }
  Response is of the form:
  {
    gameId: number,
    message/error: string
  }
*/
app.post('/game', (req, res) => {
  const { playerId } = req.body;
  if (!playerId) {
    res.status(400).json({ error: 'playerId is required' });
    return;
  }
  const gameId = games.length + 1;
  const randomQuestions = generateRandomQuestionList(5);
  games.push({ id: gameId, players: [{ playerId, score: 0, questions: randomQuestions }] });
  console.log(games.map(game => `id: ${game.id}, players: ${game.players.length}, [
    ${game.players.map(player => `${player.questions.length}]`)
}`));
  res.json({ gameId: gameId, message: 'Game created with id: ' + gameId + ' for player id: ' + playerId });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the app
