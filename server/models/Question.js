const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  text: { type: String, required: true },
  options: [{ text: String, isCorrect: Boolean }],
  explanation: { type: String },
  tags: [String],
  difficulty: { type: Number, min: 1, max: 5 },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
