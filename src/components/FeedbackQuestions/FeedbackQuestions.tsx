import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackQuestions.css';
import NextButton from '../../uiComponents/NextButton/NextButton';
import axios from 'axios';

interface FeedbackQuestion {
  id: number;
  feedbackquestion: string;
  createddate: string;
  feedbacktype: number;
}

const FeedbackQuestions = () => {
  const [questions, setQuestions] = useState<FeedbackQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<FeedbackQuestion[]>('https://feedbacksystem-rutm.onrender.com/api/feedbackquestions/');
        setQuestions(response.data);
      } catch (error: any) {
        console.error('Error fetching questions:', error.response ? error.response.data : error.message);
        setError('Failed to load questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

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
        {loading ? (
          <p>Loading questions...</p>
        ) : error && currentQuestionIndex === 0 ? (
          <p className="errorMessage">{error}</p>
        ) : questions.length > 0 ? (
          <>
            <h2>{questions[currentQuestionIndex].feedbackquestion}</h2>
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
            
            <div className="nextButton">
              <NextButton
                onClick={handleNextQuestion}
                className='nextQuestion'
                label={currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
              />
            </div>
            {error && <p className="errorMessageFeedback">{error}</p>}
          </>
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackQuestions;
