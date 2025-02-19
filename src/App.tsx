import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FeedbackQuestions from './components/FeedbackQuestions/FeedbackQuestions';
import SignInPage from './components/SignInPage/SignInPage';
import UserDetails from './components/UserDetails/UserDetails';
import './styles/Reset.css'
import './styles/Variables.css'
import './assets/backGround.webp'

function App() {
  return (
    <Router>
      <div className="feedBack">
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/feedback-questions" element={<FeedbackQuestions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
