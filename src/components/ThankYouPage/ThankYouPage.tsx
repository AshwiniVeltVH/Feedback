import './ThankYouPage.css'
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("email");
    navigate('/');
  };

  return (
    <div className="thankYouPage">
      <div className="thankYouBox">
        <div className="thankYouContainer">
          <h1 className='thankYouText'>
            Thanks for filling out the form! 😊
            <br />
            Your input means the world to us! 💙✨
          </h1>
        </div>
        <div className="logoutButton">
          <button className="logout" onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;