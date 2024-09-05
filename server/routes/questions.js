const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Question = require('../models/Question');
const User = require('../models/User');
const router = express.Router();

// @route  POST api/questions
// @desc   Create a new question
// @access Private
router.post(
  '/',
  [auth, [check('text', 'Question text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, options, explanation, tags, difficulty } = req.body;

    try {
      const newQuestion = new Question({
        text,
        options,
        explanation,
        tags,
        difficulty,
        author: req.user.id
      });

      const question = await newQuestion.save();

      res.json(question);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route  GET api/questions
// @desc   Get all questions
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const questions = await Question.find().populate('author', ['username']);
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  PUT api/questions/:id
// @desc   Update a question
// @access Private
router.put('/:id', auth, async (req, res) => {
  const { text, options, explanation, tags, difficulty } = req.body;

  // Build question object
  const questionFields = {};
  if (text) questionFields.text = text;
  if (options) questionFields.options = options;
  if (explanation) questionFields.explanation = explanation;
  if (tags) questionFields.tags = tags;
  if (difficulty) questionFields.difficulty = difficulty;

  try {
    let question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Ensure user owns question or is Admin
    if (question.author.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    question = await Question.findByIdAndUpdate(
      req.params.id,
      { $set: questionFields },
      { new: true }
    );

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  DELETE api/questions/:id
// @desc   Delete a question
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Ensure user owns question or is Admin
    if (question.author.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Question.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Question removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
