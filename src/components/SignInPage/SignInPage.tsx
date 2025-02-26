import { useNavigate } from 'react-router-dom';
import './SignInPage.css';
import { auth, provider } from './config';
import { signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from 'react';

const SignInPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const email = data.user.email;
        const fullName = data.user.displayName;
        if (email && fullName) {
          setValue(email);
          localStorage.setItem("email", email);
          localStorage.setItem("fullName", fullName);

          // Check if the user is an admin
          if (email === 'ashwinivelt@karunya.edu.in') {
            navigate('/question-module');
          } else {
            navigate('/user-details');
          }
        }
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      });
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      // Check if the user is an admin
      if (email === 'ashwinivelt@karunya.edu.in') {
        navigate('/question-module');
      } else {
        navigate('/user-details');
      }
    }
  }, [navigate]);

  return (
    <div className='signInPage'>
      <h2>Good, bad, or hilarious — we want it all! <br /> Sign in to spill the tea!</h2>
      <div className="signInContainer">
        {value ? (
          <p>Redirecting...</p>
        ) : (
          <button className="googleButton" onClick={handleGoogleSignIn}>
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google logo" />
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
