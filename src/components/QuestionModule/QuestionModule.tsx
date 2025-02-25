import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionModule.css';

const QuestionModule = () => {
  const [showModule1Feedback, setShowModule1Feedback] = useState(false);
  const [showModule2Feedback, setShowModule2Feedback] = useState(false);
  const navigate = useNavigate();

  const handleModule1Change = () => {
    setShowModule1Feedback(!showModule1Feedback);
  };

  const handleModule2Change = () => {
    setShowModule2Feedback(!showModule2Feedback);
  };

  const handleFeedbackTypeSelect = (feedbackType: number) => {
    navigate(`/feedback-questions?type=${feedbackType}`);
  };

  return (
    <div className="questionModule">
      <div className="moduleBox">
        <h2>Select Modules</h2>
        <div className="moduleCheckbox">
          <label>
            <input type="checkbox" onChange={handleModule1Change} />
            Module 1
          </label>
        </div>
        {showModule1Feedback && (
          <div className="feedbackCheckboxes">
            <label>
              <input type="checkbox" onChange={() => handleFeedbackTypeSelect(11)} />
              Pre Training Feedback
            </label>
            <label>
              <input type="checkbox" onChange={() => handleFeedbackTypeSelect(12)} />
              Post Training Feedback
            </label>
          </div>
        )}
        <div className="moduleCheckbox">
          <label>
            <input type="checkbox" onChange={handleModule2Change} />
            Module 2
          </label>
        </div>
        {showModule2Feedback && (
          <div className="feedbackCheckboxes">
            <label>
              <input type="checkbox" onChange={() => handleFeedbackTypeSelect(21)} />
              Pre Training Feedback
            </label>
            <label>
              <input type="checkbox" onChange={() => handleFeedbackTypeSelect(22)} />
              Post Training Feedback
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionModule;