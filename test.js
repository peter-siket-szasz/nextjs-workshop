const request = require('supertest');
const app = require('./index'); // Import your Express app

describe('API Tests', () => {
  it('should return all questions without answers', (done) => {
    request(app)
      .get('/questions')
      .expect(200) // Expecting a successful response with status code 200
      .end(done);
  });

  it('should return a correct answer', (done) => {
    request(app)
      .post('/answer')
      .send({ question_id: '1', selected_option_id: '2' }) // Replace with valid question and answer data
      .expect(200) // Expecting a successful response with status code 200
      .end(done);
  });

  it('should return a wrong answer', (done) => {
    request(app)
      .post('/answer')
      .send({ question_id: '2', selected_option_id: '1' }) // Replace with valid question and answer data
      .expect(200) // Expecting a successful response with status code 200
      .end(done);
  });

  it('should return a 400 error for missing parameters', (done) => {
    request(app)
      .post('/answer')
      .send({ question_id: '1' }) // Missing selected_option_id
      .expect(400) // Expecting a bad request response with status code 400
      .end(done);
  });

  it('should return a 400 error for a non-existing question_id', (done) => {
    request(app)
      .post('/answer')
      .send({ question_id: '100', selected_option_id: '2' }) // Non-existing question_id
      .expect(400) // Expecting a bad request response with status code 400
      .end(done);
  });
});
