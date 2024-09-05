import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import AuthContext, { hasRole } from '../../context/AuthContext';

const QuestionList = () => {
  const { user } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('/api/questions', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setQuestions(res.data);
      } catch (err) {
        console.error('Error fetching questions:', err.response.data);
      }
    };
    fetchQuestions();
  }, []);

  // Delete a question (Admins only)
  const deleteQuestion = async (id) => {
    if (!hasRole(user, 'Admin')) {
      return alert('Only Admins can delete questions');
    }

    try {
      await axios.delete(`/api/questions/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setQuestions(questions.filter((question) => question._id !== id));
    } catch (err) {
      console.error('Error deleting question:', err.response.data);
    }
  };

  // Export all questions to a PDF document
  const exportPDF = () => {
    const doc = new jsPDF();

    questions.forEach((question, i) => {
      doc.text(20, 10 + i * 10, `Q: ${question.text}`);
      doc.text(20, 20 + i * 10, `Options: ${question.options.map(opt => opt.text).join(', ')}`);
      doc.text(20, 30 + i * 10, `Explanation: ${question.explanation}`);
      doc.text(20, 40 + i * 10, `Difficulty: ${question.difficulty}`);
    });

    doc.save('questions.pdf');
  };

  return (
    <div>
      <h2>Question List</h2>
      <button onClick={exportPDF}>Export to PDF</button>
      {questions.map((question) => (
        <div key={question._id}>
          <h3>{question.text}</h3>
          <p>Options: {question.options.map((opt, idx) => <span key={idx}>{opt.text} </span>)}</p>
          <p>Explanation: {question.explanation}</p>
          <p>Difficulty: {question.difficulty}</p>
          <p>Tags: {question.tags.join(', ')}</p>
          {/* Only Admins can delete questions */}
          {hasRole(user, 'Admin') && <button onClick={() => deleteQuestion(question._id)}>Delete</button>}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
