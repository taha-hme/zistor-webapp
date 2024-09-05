import React, { useState, useContext } from 'react';
import AuthContext, { hasRole } from '../../context/AuthContext';
import axios from 'axios';

const CreateQuestion = () => {
  const { user } = useContext(AuthContext);
  const [question, setQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    explanation: '',
    tags: [],
    difficulty: 1
  });

  // Check if the user has the Author role or higher
  if (!hasRole(user, 'Author')) {
    return <h3>You don't have permission to create questions.</h3>;
  }

  const onChange = (e) => setQuestion({ ...question, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/questions', {
        ...question,
        author: user._id,
      }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });

      // Clear the form after submitting
      setQuestion({ text: '', options: ['', '', '', ''], explanation: '', tags: [], difficulty: 1 });
    } catch (err) {
      console.error('Error creating question:', err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Create Question</h2>
      <input
        type="text"
        name="text"
        value={question.text}
        onChange={onChange}
        placeholder="Question"
        required
      />
      <div>
        {question.options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...question.options];
              newOptions[index] = e.target.value;
              setQuestion({ ...question, options: newOptions });
            }}
            placeholder={`Option ${index + 1}`}
          />
        ))}
      </div>
      <input
        type="text"
        name="explanation"
        value={question.explanation}
        onChange={onChange}
        placeholder="Explanation"
      />
      <input
        type="number"
        name="difficulty"
        value={question.difficulty}
        onChange={onChange}
        min="1"
        max="5"
        placeholder="Difficulty"
      />
      <input
        type="text"
        name="tags"
        value={question.tags.join(',')}
        onChange={(e) => setQuestion({ ...question, tags: e.target.value.split(',') })}
        placeholder="Tags (comma separated)"
      />
      <button type="submit">Create Question</button>
    </form>
  );
};

export default CreateQuestion;
