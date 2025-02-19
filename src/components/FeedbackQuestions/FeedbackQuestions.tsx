import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackQuestions.css';
import NextButton from '../../uiComponents/NextButton/NextButton';

const questions = [
  "How satisfied are you with our product?",
  "How would you rate our customer service?",
  "How likely are you to recommend our product to others?",
  "What features do you find most useful?",
  "What features do you think we could improve?",
  "How easy is it to use our product?",
  "How would you rate the value for money of our product?",
  "How responsive have we been to your questions or concerns?",
  "How well does our product meet your needs?",
  "What can we do to improve your experience?"
];

const FeedbackQuestions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle form submission here
      alert('Form submitted!');
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("email");
    navigate('/');
  };

  return (
    <div className='questions'>
      <div className='question-container'>
        <h2>{questions[currentQuestionIndex]}</h2>
        <div className='rating-boxes'>
          {Array.from({ length: 10 }, (_, i) => (
            <button key={i} className='rating-box' onClick={handleNextQuestion}>
              {i + 1}
            </button>
          ))}
        </div>
        <div className="nextButton">
          <NextButton 
            onClick={handleNextQuestion} 
            className='nextQuestion'
            label={currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'} 
          />
        </div>
        <div className="logoutButton">
          <button className="logout" onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackQuestions;