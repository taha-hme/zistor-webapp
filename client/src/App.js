import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateQuestion from './components/questions/CreateQuestion';
import QuestionList from './components/questions/QuestionList';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/create-question" component={CreateQuestion} />
          <Route path="/questions" component={QuestionList} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;

