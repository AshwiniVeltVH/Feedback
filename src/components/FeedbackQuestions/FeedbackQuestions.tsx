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
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
    setError(null); // Clear error when a rating is selected
  };

  const handleNextQuestion = () => {
    if (selectedRating === null) {
      setError('Please provide a rating before moving to the next question');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedRating(null); // Reset rating for the next question
    } else {
      // Navigate to ThankYouPage on submit
      navigate('/thankyou-page');
    }
  };

  return (
    <div className='questions'>
      <div className='questionContainer'>
        <h2>{questions[currentQuestionIndex]}</h2>
        <div className='ratingBoxes'>
          {Array.from({ length: 10 }, (_, i) => (
            <button
              key={i}
              className={`ratingBox ${selectedRating === i + 1 ? 'selected' : ''}`}
              onClick={() => handleRatingSelect(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {error && <p className="errorMessage">{error}</p>}
        <div className="nextButton">
          <NextButton
            onClick={handleNextQuestion}
            className='nextQuestion'
            label={currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackQuestions;