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
    data.questionId = parseInt(data.questionId);
    data.correctOptionId = parseInt(data.correctOptionId);
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
  if (n > questions.length) {
    throw new Error('Requested more questions than available');
  }
  const questionList = [];
  const questionsCopy = [...questions];
  Array.from({ length: n }).forEach(() => {
    // Later make sure no duplicates are added
    const randomIndex = Math.floor(Math.random() * questionsCopy.length);
    const randomQuestion = questionsCopy.splice(randomIndex, 1)[0];
    questionList.push(randomQuestion.questionId); // Question ids start from 1
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

/** API route to get a specific question */
app.get('/question/:id', (req, res) => {
  const questionId = parseInt(req.params.id);
  const question = questions.find(question => question.questionId === questionId);
  if (question) {
    const { correctOptionId, ...questionWithoutAnswer } = question;
    res.json(questionWithoutAnswer);
  } else {
    res.status(400).json({ error: 'Question not found' });
  }
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

/** Endpoint for creating a game. Creates a game object and stores it.
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
app.post('/game/new', (req, res) => {
  const { playerId } = req.body;
  if (!playerId) {
    res.status(400).json({ error: 'playerId is required' });
    return;
  }
  const gameId = games.length + 1;
  games.push({ id: gameId, players: [] });
  console.log(games.map(game => `id: ${game.id}, players: ${game.players.length}, [
    ${game.players.map(player => `${player.questions.length}]`)
}`));
  res.json({ gameId: gameId, message: 'Game created with id: ' + gameId + '. Requested by player id: ' + playerId });
});

/** Endpoint for joining a game.
 * If player is not in the game, they get added. If the player is already in, they don't get added again.
 * Request body should be of the form: 
 * {
 *  playerId: string,
 *  playerName: string,
 *  gameId: number
 * }
 * Response is of the form:
 * {
 *  nextQuestion: number/null,
 *  playerAdded: boolean,
 * }
 * */
app.post('/game/join', (req, res) => {
  const { playerId, playerName, gameId } = req.body;
  if (!playerId || !gameId) {
    res.status(400).json({ error: 'gameId and playerId are required' });
    return;
  }

  const game = findGame(parseInt(gameId));
  if (!game) {
    res.status(400).json({ error: 'Game not found' });
    return;
  }
  
  let player;
  let playerAdded = false;
  player = game.players.find(player => player.playerId === playerId);

  if (!player) {
    let randomQuestions;
    try {
      randomQuestions = generateRandomQuestionList(10);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: 'Error while assigning questions' });
      return;
    }
    player = { playerId, playerName: playerName || 'Guest', score: 0, questions: randomQuestions };
    game.players.push(player);
    playerAdded = true;
  }

  const nextQuestion = player.questions.length ? player.questions[0] : null;
  
  res.json({ nextQuestion, playerAdded });
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
app.post('/game/answer', (req, res) => {
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
  const player = game.players.find(player => player.playerId === playerId);
  const question = questions.find(question => question.questionId === questionId);
  const playerHasQuestion = player.questions.includes(questionId);
  // Update game if player answered own question
  if (playerHasQuestion) {
    player.questions.splice(player.questions.indexOf(questionId), 1);
    if (question.correctOptionId === answer) {
      player.score += 100;
    }
  } else {
    console.log('question not in list');
  };
  const nextQuestion = player.questions.length ? player.questions[0] : null;
  res.json({ nextQuestion, receivedAnswer: answer, correctAnswer: question.correctOptionId });
});

/** API route for getting rankings */
app.get('/ranking/:gameId', (req, res) => {
  const gameId = parseInt(req.params.gameId);
  const game = findGame(gameId);
  if (!game) {
    res.status(400).json({ error: 'Game not found' });
    return;
  }
  const ranking = game.players
    .sort((a, b) => b.score - a.score)
    .map(player => ({ playerId: player.playerId, score: player.score, playerName: player.playerName }));
  res.json(ranking);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the app
