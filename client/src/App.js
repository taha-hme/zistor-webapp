import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateQuestion from './components/questions/CreateQuestion';
import QuestionList from './components/questions/QuestionList';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={Login} />
          <Route path='/register' element={Register} />
          <Route path='/create-question' element={CreateQuestion} />
          <Route path='/questions' element={QuestionList} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

